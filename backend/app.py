from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from sqlalchemy.exc import IntegrityError
from models import db, User, Pet, SuccessStory, Review, Appointment, Event, Donation
from datetime import datetime

app = Flask(__name__)
CORS(app)

# ------------------- Config -------------------
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///petconnect.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
bcrypt = Bcrypt(app)

# ------------------- Home -------------------
@app.route('/')
def home():
    return "Welcome to the PetConnect Flask Backend!"

# ------------------- Register & Login -------------------
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
        return jsonify({"message": "User registered successfully!"}), 200
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "Email already registered."}), 409
    except Exception as e:
        return jsonify({"message": f"Registration failed: {e}"}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({"message": "Login successful!", "role": user.role, "user_id": user.id})
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
    shelter_id=data['shelter_id']
)

        db.session.add(new_pet)
        db.session.commit()
        return jsonify({"message": "Pet added successfully!"}), 201
    except Exception as e:
        print("Error adding pet:", e)
        return jsonify({"message": "Failed to add pet."}), 500


@app.route('/pets', methods=['GET'])
def get_pets():
    pets = Pet.query.all()
    return jsonify([
        {
            "id": pet.id,
            "name": pet.name,
            "breed": pet.breed,
            "age": pet.age,
            "description": pet.description,
            "image_url": pet.image_url,
            "pet_type": pet.pet_type,
            "origin": pet.origin,
            "shelter_id": pet.shelter_id
        } for pet in pets
    ])

@app.route('/pets/<int:id>', methods=['GET'])
def get_pet_by_id(id):
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
        "trained": pet.trained
    })

@app.route('/delete_pet/<int:pet_id>', methods=['DELETE'])
def delete_pet(pet_id):
    shelter_id = request.args.get('shelter_id', type=int)
    pet = Pet.query.get(pet_id)
    if not pet:
        return jsonify({"message": "Pet not found"}), 404
    if pet.shelter_id != shelter_id:
        return jsonify({"message": "Unauthorized"}), 403

    db.session.delete(pet)
    db.session.commit()
    return jsonify({"message": "Pet deleted"}), 200

@app.route('/update_pet/<int:pet_id>', methods=['PUT'])
def update_pet(pet_id):
    data = request.get_json()
    pet = Pet.query.get_or_404(pet_id)
    pet.name = data.get('name', pet.name)
    pet.breed = data.get('breed', pet.breed)
    pet.age = data.get('age', pet.age)
    pet.image_url = data.get('image_url', pet.image_url)
    pet.description = data.get('description', pet.description)
    pet.pet_type = data.get('pet_type', pet.pet_type)
    pet.origin = data.get('origin', pet.origin)
    db.session.commit()
    return jsonify({"message": "Pet updated"}), 200

# ------------------- Success Stories -------------------
@app.route('/success_stories', methods=['GET'])
def get_success_stories():
    stories = SuccessStory.query.all()
    return jsonify([{
        "id": s.id,
        "title": s.title,
        "text": s.text,
        "image_url": s.image_url,
    } for s in stories])

@app.route('/add_success_story', methods=['POST'])
def add_success_story():
    data = request.get_json()
    try:
        story = SuccessStory(
            title=data['title'],
            text=data['text'],
            image_url=data.get('image_url', ''),
            shelter_id=data['shelter_id']  # 🟢 MUST match this key!
        )
        db.session.add(story)
        db.session.commit()
        return jsonify({"message": "Success story added!"}), 201
    except Exception as e:
        print("Error adding story:", e)
        return jsonify({"message": "Failed to add story"}), 500


@app.route('/update_success_story/<int:story_id>', methods=['PUT'])
def update_success_story(story_id):
    data = request.get_json()
    story = SuccessStory.query.get_or_404(story_id)
    story.title = data.get('title', story.title)
    story.text = data.get('text', story.text)
    story.image_url = data.get('image_url', story.image_url)
    db.session.commit()
    return jsonify({"message": "Story updated"}), 200

@app.route('/delete_success_story/<int:story_id>', methods=['DELETE'])
def delete_success_story(story_id):
    story = SuccessStory.query.get_or_404(story_id)
    db.session.delete(story)
    db.session.commit()
    return jsonify({"message": "Story deleted"}), 200

# ------------------- Feedback -------------------
@app.route('/feedback', methods=['POST'])
def submit_feedback():
    data = request.get_json()
    try:
        review = Review(
            user_id=data['user_id'],
            pet_id=data['pet_id'],
            text=data['text'],
            rating=data.get('rating', None)
        )
        db.session.add(review)
        db.session.commit()
        return jsonify({"message": "Feedback submitted"}), 201
    except Exception as e:
        return jsonify({"message": f"Feedback error: {e}"}), 500

@app.route('/feedback', methods=['GET'])
def get_feedback():
    feedback = Review.query.all()
    return jsonify([{
        "id": f.id,
        "text": f.text,
        "rating": f.rating,
        "user_id": f.user_id,
        "pet_id": f.pet_id
    } for f in feedback])

# ------------------- FAQs -------------------
@app.route('/faq', methods=['GET'])
def get_faqs():
    faqs = [
        {"question": "How do I adopt a pet?", "answer": "Register, browse, and contact the shelter."},
        {"question": "Can I list a pet?", "answer": "Only shelters can list pets."},
        {"question": "Is it free to use PetConnect?", "answer": "Yes! It’s a free student-built tool."}
    ]
    return jsonify(faqs)

# ------------------- Appointments -------------------
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
    return jsonify({"message": "Appointment booked"}), 201

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

@app.route('/appointments/<int:id>', methods=['DELETE'])
def delete_appointment(id):
    appt = Appointment.query.get_or_404(id)
    db.session.delete(appt)
    db.session.commit()
    return jsonify({"message": "Appointment deleted"}), 200

@app.route('/appointments/<int:id>', methods=['PUT'])
def update_appointment(id):
    data = request.get_json()
    appt = Appointment.query.get_or_404(id)
    appt.date = data.get('date', appt.date)
    appt.time = data.get('time', appt.time)
    appt.message = data.get('message', appt.message)
    db.session.commit()
    return jsonify({"message": "Appointment updated"}), 200

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
    return jsonify({"message": "Event created"}), 201

@app.route('/events/<int:id>', methods=['PUT'])
def update_event(id):
    data = request.get_json()
    event = Event.query.get_or_404(id)
    event.title = data.get('title', event.title)
    event.date = data.get('date', event.date)
    event.location = data.get('location', event.location)
    event.description = data.get('description', event.description)
    db.session.commit()
    return jsonify({"message": "Event updated"}), 200

@app.route('/events/<int:id>', methods=['DELETE'])
def delete_event(id):
    event = Event.query.get_or_404(id)
    db.session.delete(event)
    db.session.commit()
    return jsonify({"message": "Event deleted"}), 200

# ------------------- Donations -------------------
@app.route('/donate', methods=['POST'])
def donate():
    data = request.get_json()
    try:
        donation = Donation(
            user_id=data['user_id'],
            amount=data['amount'],
            message=data.get('message', ''),
            timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        )
        db.session.add(donation)
        db.session.commit()
        return jsonify({"message": "Donation received!"}), 201
    except Exception as e:
        return jsonify({"message": f"Donation failed: {e}"}), 500

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

# ------------------- Run -------------------
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
