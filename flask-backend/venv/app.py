from flask import Flask, request, jsonify
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import mysql.connector

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

model = SentenceTransformer('all-MiniLM-L6-v2')

# MySQL Database Connection
db = mysql.connector.connect(
    host='localhost',
    user='root',
    password='',
    database='research'
)

@app.route('/api/match', methods=['POST'])
def match_student_to_mentors():
    data = request.json
    student_interests = data.get('research_interests', [])

    # Fetch mentors from the database
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT name, specialization FROM mentors")
    mentors = cursor.fetchall()

    
    student_vector = model.encode(" ".join(student_interests))
    mentor_vectors = [model.encode(mentor['specialization']) for mentor in mentors]

    similarities = cosine_similarity([student_vector], mentor_vectors)[0]

    
    matched_mentors = [(mentors[i]['name'], sim) for i, sim in enumerate(similarities) if sim >= 0.75]
    
    return jsonify(matched_mentors)

if __name__ == '__main__':
    app.run(debug=True)
