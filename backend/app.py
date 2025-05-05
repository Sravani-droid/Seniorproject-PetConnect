from flask import Flask, request, jsonify
from flask_cors import CORS
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from sqlalchemy.exc import IntegrityError
from datetime import datetime
from models import db, User, Pet, Review, SuccessStory, Appointment, Event, Donation, FAQ

app = Flask(__name__) 
app.config['CORS_HEADERS'] = 'Content-Type'

# Allow all routes to accept from React frontend
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
bcrypt = Bcrypt(app)

# ------------------- Configuration -------------------
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///petconnect.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# ------------------- Home -------------------
@app.route('/')
def index():
    return "Welcome to PetConnect Flask Backend!"

# ------------------- Auth -------------------
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    try:
        hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_user = User(
            name=data['name'],
            email=data['email'],
            password=hashed_pw,
            role=data['role']
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered!"}), 200
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "Email already exists."}), 409
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({
            "message": "Login successful!",
            "role": user.role,
            "user_id": user.id,
            "name": user.name
        })
    return jsonify({"message": "Invalid credentials"}), 401

# ------------------- Pets -------------------
@app.route('/add_pet', methods=['POST'])
def add_pet():
    data = request.get_json()
    try:
        new_pet = Pet(
            name=data['name'],
            breed=data['breed'],
            age=data['age'],
            pet_type=data['pet_type'],
            origin=data['origin'],
            description=data.get('description', ''),
            image_url=data.get('image_url', ''),
            gender=data.get('gender', ''),
            birthdate=data.get('birthdate', ''),
            weight=data.get('weight', ''),
            height=data.get('height', ''),
            health_status=data.get('health_status', ''),
            rabies_vaccinated=data.get('rabies_vaccinated', False),
            trained=data.get('trained', False),
            spayed_neutered=data.get('spayed_neutered', False),
            dapp=data.get('dapp', False),
            lepto=data.get('lepto', False),
            bordetella=data.get('bordetella', False),
            fvrcp=data.get('fvrcp', False),
            good_with_dogs=data.get('good_with_dogs', False),
            good_with_cats=data.get('good_with_cats', False),
            good_with_kids=data.get('good_with_kids', False),
            shelter_id=data['shelter_id']
        )
        db.session.add(new_pet)
        db.session.commit()
        return jsonify({"message": "Pet added!"}), 201
    except Exception as e:
        return jsonify({"message": f"Add pet error: {str(e)}"}), 500

@app.route('/pets', methods=['GET'])
def get_pets():
    pets = Pet.query.all()
    return jsonify([{
        "id": p.id,
        "name": p.name,
        "breed": p.breed,
        "age": p.age,
        "description": p.description,
        "image_url": p.image_url,
        "pet_type": p.pet_type,
        "origin": p.origin,
        "gender": p.gender,
        "birthdate": p.birthdate,
        "weight": p.weight,
        "height": p.height,
        "health_status": p.health_status,
        "rabies_vaccinated": p.rabies_vaccinated,
        "trained": p.trained,
        "spayed_neutered": p.spayed_neutered,
        "dapp": p.dapp,
        "lepto": p.lepto,
        "bordetella": p.bordetella,
        "fvrcp": p.fvrcp,
        "good_with_dogs": p.good_with_dogs,
        "good_with_cats": p.good_with_cats,
        "good_with_kids": p.good_with_kids,
        "shelter_id": p.shelter_id
    } for p in pets])

@app.route('/pets/<int:id>', methods=['GET'])
def get_pet(id):
    pet = Pet.query.get_or_404(id)
    return jsonify({
        "id": pet.id,
        "name": pet.name,
        "breed": pet.breed,
        "age": pet.age,
        "description": pet.description,
        "image_url": pet.image_url,
        "pet_type": pet.pet_type,
        "origin": pet.origin,
        "gender": pet.gender,
        "birthdate": pet.birthdate,
        "weight": pet.weight,
        "height": pet.height,
        "health_status": pet.health_status,
        "rabies_vaccinated": pet.rabies_vaccinated,
        "trained": pet.trained,
        "spayed_neutered": pet.spayed_neutered,
        "dapp": pet.dapp,
        "lepto": pet.lepto,
        "bordetella": pet.bordetella,
        "fvrcp": pet.fvrcp,
        "good_with_dogs": pet.good_with_dogs,
        "good_with_cats": pet.good_with_cats,
        "good_with_kids": pet.good_with_kids,
        "shelter_id": pet.shelter_id
    })

@app.route('/update_pet/<int:id>', methods=['PUT'])
def update_pet(id):
    data = request.get_json()
    pet = Pet.query.get_or_404(id)
    for key in data:
        if hasattr(pet, key):
            setattr(pet, key, data[key])
    db.session.commit()
    return jsonify({"message": "Pet updated!"})

@app.route('/delete_pet/<int:id>', methods=['DELETE'])
def delete_pet(id):
    pet = Pet.query.get_or_404(id)
    db.session.delete(pet)
    db.session.commit()
    return jsonify({"message": "Pet deleted!"})

# ------------------- Reviews -------------------
@app.route('/add_review', methods=['POST'])
def add_review():
    data = request.get_json()
    try:
        new_review = Review(
            text=data['text'],
            rating=data.get('rating'),
            user_id=data['user_id'],
            pet_id=data['pet_id']
        )
        db.session.add(new_review)
        db.session.commit()
        return jsonify({"message": "Review added!"}), 201
    except Exception as e:
        return jsonify({"message": f"Review error: {str(e)}"}), 500


# ------------------- Success Stories -------------------
@app.route("/add_success_story", methods=["POST"])
def add_success_story():
    data = request.get_json()
    new_story = SuccessStory(
        title=data["title"],
        text=data["text"],
        image_url=data.get("image_url", ""),
        shelter_id=data["shelter_id"]
    )
    db.session.add(new_story)
    db.session.commit()
    return jsonify({"message": "Success story added"}), 201

@app.route("/success_stories", methods=["GET"])
def get_success_stories():
    stories = SuccessStory.query.all()
    return jsonify([{
        "id": s.id,
        "title": s.title,
        "text": s.text,
        "image_url": s.image_url,
        "user_id": s.shelter_id
    } for s in stories])

@app.route("/update_success_story/<int:story_id>", methods=["PUT"])
def update_success_story(story_id):
    data = request.get_json()
    story = SuccessStory.query.get_or_404(story_id)
    story.title = data["title"]
    story.text = data["text"]
    story.image_url = data.get("image_url", story.image_url)
    db.session.commit()
    return jsonify({"message": "Success story updated"})

@app.route("/delete_success_story/<int:story_id>", methods=["DELETE"])
def delete_success_story(story_id):
    story = SuccessStory.query.get_or_404(story_id)
    db.session.delete(story)
    db.session.commit()
    return jsonify({"message": "Success story deleted"})

# ------------------- Events -------------------
@app.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([{
        "id": e.id,
        "title": e.title,
        "date": e.date,
        "location": e.location,
        "description": e.description,
        "shelter_id": e.shelter_id
    } for e in events])

@app.route('/events', methods=['POST'])
def create_event():
    data = request.get_json()
    event = Event(
        title=data['title'],
        date=data['date'],
        location=data['location'],
        description=data.get('description', ''),
        shelter_id=data['shelter_id']
    )
    db.session.add(event)
    db.session.commit()
    return jsonify({"message": "Event added!"})

@app.route('/events/<int:event_id>', methods=['GET'])
def get_event_by_id(event_id):
    event = Event.query.get_or_404(event_id)
    return jsonify({
        "id": event.id,
        "title": event.title,
        "date": event.date,
        "location": event.location,
        "description": event.description,
        "shelter_id": event.shelter_id
    })

@app.route('/update_event/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    data = request.get_json()
    event = Event.query.get_or_404(event_id)
    event.title = data["title"]
    event.date = data["date"]
    event.location = data["location"]
    event.description = data.get("description", "")
    db.session.commit()
    return jsonify({"message": "Event updated successfully"})

@app.route('/delete_event/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    event = Event.query.get_or_404(event_id)
    db.session.delete(event)
    db.session.commit()
    return jsonify({"message": "Event deleted"})

# ------------------- Appointments -------------------
@app.route('/appointments', methods=['GET'])
def get_appointments():
    return jsonify([{
        "id": a.id,
        "user_id": a.user_id,
        "pet_id": a.pet_id,
        "date": a.date,
        "time": a.time,
        "message": a.message
    } for a in Appointment.query.all()])

@app.route("/appointments", methods=["POST"])
def create_appointment():
    data = request.get_json()
    new_appointment = Appointment(
        user_id=data["user_id"],
        pet_id=data["pet_id"],
        date=data["date"],
        time=data["time"],
        message=data.get("message", "")
    )
    db.session.add(new_appointment)
    db.session.commit()
    return jsonify({"message": "Appointment booked"}), 201

@app.route('/appointments/<int:id>', methods=['PUT'])
def update_appointment(id):
    appt = Appointment.query.get(id)
    if not appt:
        return jsonify({"error": "Appointment not found"}), 404
    data = request.json
    appt.date = data.get("date", appt.date)
    appt.time = data.get("time", appt.time)
    appt.message = data.get("message", appt.message)
    db.session.commit()
    return jsonify({"message": "Appointment updated"}), 200

@app.route('/appointments/<int:id>', methods=['DELETE'])
def delete_appointment(id):
    appt = Appointment.query.get(id)
    if appt:
        db.session.delete(appt)
        db.session.commit()
        return jsonify({"message": "Appointment deleted"}), 200
    return jsonify({"error": "Appointment not found"}), 404

# ------------------- Donations -------------------
@app.route('/donate', methods=['POST'])
def donate():
    data = request.get_json()
    donation = Donation(
        user_id=data['user_id'],
        amount=data['amount'],
        message=data.get('message', ''),
        timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    )
    db.session.add(donation)
    db.session.commit()
    return jsonify({"message": "Donation successful!"})

@app.route('/donations', methods=['GET'])
def get_donations():
    donations = Donation.query.all()
    return jsonify([{
        "id": d.id,
        "user_id": d.user_id,
        "amount": d.amount,
        "message": d.message,
        "timestamp": d.timestamp
    } for d in donations])

# ------------------- FAQs -------------------
@app.route('/submit_faq', methods=['POST'])
def submit_faq():
    data = request.get_json()
    new_faq = FAQ(question=data['question'])
    db.session.add(new_faq)
    db.session.commit()
    return jsonify({"message": "FAQ submitted for approval"}), 201

@app.route('/pending_faqs', methods=['GET'])
def get_pending_faqs():
    faqs = FAQ.query.filter_by(approved=False).all()
    return jsonify([{"id": f.id, "question": f.question} for f in faqs])

@app.route('/approve_faq/<int:faq_id>', methods=['POST'])
def approve_faq(faq_id):
    faq = FAQ.query.get_or_404(faq_id)
    faq.approved = True
    db.session.commit()
    return jsonify({"message": "FAQ approved"}), 200

@app.route('/faqs', methods=['GET'])
def get_approved_faqs():
    faqs = FAQ.query.filter_by(approved=True).all()
    return jsonify([{
        "id": f.id,
        "question": f.question,
        "answer": f.answer or "Pending response"
    } for f in faqs])

# ------------------- Run -------------------
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        if not FAQ.query.first():
            sample_faqs = [
                FAQ(question="How do I adopt a pet?", answer="Browse pets and contact shelters."),
                FAQ(question="Can I volunteer?", answer="Yes! Contact us through PetConnect."),
                FAQ(question="Is there a fee to adopt?", answer="It depends on the shelter's policy."),
            ]
            db.session.add_all(sample_faqs)
            db.session.commit()

    app.run(debug=True)