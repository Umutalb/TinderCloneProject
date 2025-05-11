from flask import Flask, jsonify

app = Flask(__name__)

# Örnek kullanıcılar
users = [
    {"name": "Ayşe", "age": 25, "gender": "k", "hobbies": {"kitap": 8, "müzik": 7, "yürüyüş": 5}},
    {"name": "Ali", "age": 28, "gender": "e", "hobbies": {"spor": 6, "müzik": 5, "kitap": 7}},
    {"name": "Zeynep", "age": 24, "gender": "k", "hobbies": {"yürüyüş": 9, "resim": 5, "kitap": 7}},
    {"name": "Mehmet", "age": 30, "gender": "e", "hobbies": {"film": 8, "kitap": 4, "spor": 6}},
    {"name": "Fatma", "age": 26, "gender": "k", "hobbies": {"müzik": 8, "dans": 5, "resim": 6}},
    {"name": "Ahmet", "age": 29, "gender": "e", "hobbies": {"spor": 7, "kitap": 6, "resim": 4}},
    {"name": "Elif", "age": 23, "gender": "k", "hobbies": {"kitap": 9, "film": 5, "yürüyüş": 7}},
]

def calculate_score(user1, user2):
    age_diff = abs(user1["age"] - user2["age"])
    age_score = max(0, 20 - age_diff * 2)

    common_hobbies = set(user1["hobbies"].keys()) & set(user2["hobbies"].keys())
    hobby_score = sum(
        10 - abs(user1["hobbies"][h] - user2["hobbies"][h]) for h in common_hobbies
    )

    total_score = age_score + hobby_score
    return total_score

@app.route("/oneriler", methods=["GET"])
def öneri_getir():
    all_results = {}
    for current_user in users:
        scores = []
        for other_user in users:
            if other_user["name"] != current_user["name"]:
                score = calculate_score(current_user, other_user)
                scores.append((other_user["name"], score))

        top_5 = sorted(scores, key=lambda x: x[1], reverse=True)[:5]
        all_results[current_user["name"]] = [{"name": name, "score": score} for name, score in top_5]
    return jsonify(all_results)

if __name__ == "__main__":
    app.run(debug=True)
