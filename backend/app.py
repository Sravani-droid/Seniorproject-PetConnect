from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from sqlalchemy.exc import IntegrityError
from datetime import datetime
from models import db, User, Pet, Review, SuccessStory, Appointment, Event, Donation
from models import FAQ  # if not already present

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# ------------------- Configuration -------------------
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///petconnect.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# ------------------- Home Route -------------------
@app.route('/')
def index():
    return "Welcome to PetConnect Flask Backend!"

# ------------------- Auth Routes -------------------
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
            "name": user.name  # ensure this line is added
        })
    return jsonify({"message": "Invalid credentials"}), 401

# ------------------- Pet Routes -------------------
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

# ------------------- Review -------------------
@app.route('/add_review', methods=['POST'])
def add_review():
    data = request.get_json()
    review = Review(
        text=data['text'],
        rating=data.get('rating', None),
        user_id=data['user_id'],
        pet_id=data['pet_id']
    )
    db.session.add(review)
    db.session.commit()
    return jsonify({"message": "Review submitted!"})

# ------------------- Success Stories -------------------
@app.route('/success_stories', methods=['GET'])
def get_success_stories():
    stories = SuccessStory.query.all()

    # If empty, seed default ones
    if not stories:
        defaults = [
            SuccessStory(title="Buddy Finds a Home", text="Buddy, a rescued labrador, found his forever home thanks to PetConnect!", image_url="https://via.placeholder.com/300", user_id=1),
            SuccessStory(title="Mittens' Journey", text="Mittens the cat was saved from the streets and is now thriving in her new family.", image_url="https://via.placeholder.com/300", user_id=1),
            SuccessStory(title="Charlie’s Second Chance", text="Charlie was adopted after just 3 days of listing!", image_url="https://via.placeholder.com/300", user_id=1)
        ]
        db.session.bulk_save_objects(defaults)
        db.session.commit()
        stories = SuccessStory.query.all()

    return jsonify([
        {
            "id": s.id,
            "title": s.title,
            "text": s.text,
            "image_url": s.image_url
        } for s in stories
    ])

@app.route('/add_success_story', methods=['POST'])
def add_success_story():
    data = request.get_json()
    story = SuccessStory(
        title=data['title'],
        text=data['text'],
        image_url=data.get('image_url', ''),
        user_id=data['user_id']
    )
    db.session.add(story)
    db.session.commit()
    return jsonify({"message": "Story added!"})

@app.route('/update_success_story/<int:id>', methods=['PUT'])
def update_success_story(id):
    data = request.get_json()
    story = SuccessStory.query.get_or_404(id)
    story.title = data.get('title', story.title)
    story.text = data.get('text', story.text)
    story.image_url = data.get('image_url', story.image_url)
    db.session.commit()
    return jsonify({"message": "Story updated!"})

@app.route('/delete_success_story/<int:id>', methods=['DELETE'])
def delete_success_story(id):
    story = SuccessStory.query.get_or_404(id)
    db.session.delete(story)
    db.session.commit()
    return jsonify({"message": "Story deleted!"})

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

# ------------------- Appointments -------------------
@app.route('/appointments', methods=['GET'])
def get_appointments():
    return jsonify([
        {
            "id": a.id,
            "user_id": a.user_id,
            "pet_id": a.pet_id,
            "date": a.date,
            "time": a.time,
            "message": a.message
        } for a in Appointment.query.all()
    ])
@app.route('/appointments', methods=['POST'])
def create_appointment():
    data = request.get_json()
    appt = Appointment(
        user_id=data['user_id'],
        pet_id=data['pet_id'],
        date=data['date'],
        time=data['time'],
        message=data.get('message', '')
    )
    db.session.add(appt)
    db.session.commit()
    return jsonify({"message": "Appointment created!"})

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

# ------------------- FAQ -------------------
@app.route('/submit_faq', methods=['POST'])
def submit_faq():
    data = request.get_json()
    try:
        new_faq = FAQ(question=data['question'])
        db.session.add(new_faq)
        db.session.commit()
        return jsonify({"message": "FAQ submitted for approval"}), 201
    except Exception as e:
        return jsonify({"message": f"Submission failed: {e}"}), 500


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
    return jsonify([
        {"id": f.id, "question": f.question, "answer": f.answer or "Pending response"}
        for f in faqs
    ])

# ------------------- Run Server -------------------
if __name__ == '__main__':
    with app.app_context():
        db.create_all()

        # Seed only if FAQs table is empty
        from models import FAQ
        if not FAQ.query.first():
            sample_faqs = [
                FAQ(question="How do I adopt a pet?", answer="Browse pets and contact shelters."),
                FAQ(question="Can I volunteer?", answer="Yes! Contact us through PetConnect."),
                FAQ(question="Is there a fee to adopt?", answer="It depends on the shelter's policy."),
            ]
            db.session.add_all(sample_faqs)
            db.session.commit()

    app.run(debug=True)