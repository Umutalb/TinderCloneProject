import random

# 30 yerel kullanıcı verisi
users = [
    {"name": "Onur", "age": 29, "gender": "e", "preferred_gender": "k", "preferred_age_range": [26, 36], "hobbies": ["spor", "fotoğrafçılık", "sinema"], "location": "Bursa"},
    {"name": "Ayşe", "age": 24, "gender": "k", "preferred_gender": "e", "preferred_age_range": [23, 30], "hobbies": ["kitap", "dans", "yoga"], "location": "İstanbul"},
    {"name": "Mehmet", "age": 27, "gender": "e", "preferred_gender": "k", "preferred_age_range": [22, 28], "hobbies": ["müzik", "yürüyüş", "spor"], "location": "Ankara"},
    {"name": "Zeynep", "age": 30, "gender": "k", "preferred_gender": "e", "preferred_age_range": [27, 35], "hobbies": ["sinema", "kitap", "yoga"], "location": "İzmir"},
    {"name": "Ali", "age": 32, "gender": "e", "preferred_gender": "k", "preferred_age_range": [28, 34], "hobbies": ["fotoğrafçılık", "spor", "kamp"], "location": "Eskişehir"},
    {"name": "Fatma", "age": 26, "gender": "k", "preferred_gender": "e", "preferred_age_range": [25, 33], "hobbies": ["dans", "müzik", "yoga"], "location": "Antalya"},
    {"name": "Can", "age": 25, "gender": "e", "preferred_gender": "k", "preferred_age_range": [20, 28], "hobbies": ["yürüyüş", "kitap", "spor"], "location": "Trabzon"},
    {"name": "Elif", "age": 23, "gender": "k", "preferred_gender": "e", "preferred_age_range": [21, 27], "hobbies": ["sinema", "fotoğrafçılık", "dans"], "location": "İstanbul"},
    {"name": "Emre", "age": 31, "gender": "e", "preferred_gender": "k", "preferred_age_range": [26, 32], "hobbies": ["kamp", "spor", "yürüyüş"], "location": "Bursa"},
    {"name": "Selin", "age": 28, "gender": "k", "preferred_gender": "e", "preferred_age_range": [27, 35], "hobbies": ["kitap", "dans", "yoga"], "location": "Ankara"},
    {"name": "Hakan", "age": 29, "gender": "e", "preferred_gender": "k", "preferred_age_range": [24, 30], "hobbies": ["müzik", "yürüyüş", "fotoğrafçılık"], "location": "İzmir"},
    {"name": "Merve", "age": 27, "gender": "k", "preferred_gender": "e", "preferred_age_range": [25, 34], "hobbies": ["sinema", "spor", "kitap"], "location": "Kayseri"},
    {"name": "Burak", "age": 26, "gender": "e", "preferred_gender": "k", "preferred_age_range": [22, 28], "hobbies": ["kamp", "fotoğrafçılık", "müzik"], "location": "Mersin"},
    {"name": "Nazlı", "age": 30, "gender": "k", "preferred_gender": "e", "preferred_age_range": [27, 35], "hobbies": ["yoga", "kitap", "sinema"], "location": "Gaziantep"},
    {"name": "Kemal", "age": 33, "gender": "e", "preferred_gender": "k", "preferred_age_range": [30, 36], "hobbies": ["yürüyüş", "spor", "kitap"], "location": "Kocaeli"},
    {"name": "Eda", "age": 25, "gender": "k", "preferred_gender": "e", "preferred_age_range": [24, 30], "hobbies": ["dans", "müzik", "fotoğrafçılık"], "location": "Denizli"},
    {"name": "Ahmet", "age": 28, "gender": "e", "preferred_gender": "k", "preferred_age_range": [25, 31], "hobbies": ["kamp", "yürüyüş", "kitap"], "location": "Malatya"},
    {"name": "Seda", "age": 22, "gender": "k", "preferred_gender": "e", "preferred_age_range": [20, 26], "hobbies": ["sinema", "yoga", "dans"], "location": "Konya"},
    {"name": "Yusuf", "age": 24, "gender": "e", "preferred_gender": "k", "preferred_age_range": [22, 26], "hobbies": ["spor", "müzik", "kitap"], "location": "Manisa"},
    {"name": "Melisa", "age": 29, "gender": "k", "preferred_gender": "e", "preferred_age_range": [27, 33], "hobbies": ["yürüyüş", "fotoğrafçılık", "kitap"], "location": "Samsun"},
    {"name": "Gökhan", "age": 30, "gender": "e", "preferred_gender": "k", "preferred_age_range": [27, 35], "hobbies": ["spor", "kitap", "kamp"], "location": "Adana"},
    {"name": "Buse", "age": 26, "gender": "k", "preferred_gender": "e", "preferred_age_range": [25, 32], "hobbies": ["dans", "sinema", "fotoğrafçılık"], "location": "Eskişehir"},
    {"name": "Mert", "age": 25, "gender": "e", "preferred_gender": "k", "preferred_age_range": [23, 29], "hobbies": ["kitap", "müzik", "spor"], "location": "İstanbul"},
    {"name": "Derya", "age": 28, "gender": "k", "preferred_gender": "e", "preferred_age_range": [26, 34], "hobbies": ["yürüyüş", "kamp", "sinema"], "location": "Ankara"},
    {"name": "Tolga", "age": 31, "gender": "e", "preferred_gender": "k", "preferred_age_range": [28, 34], "hobbies": ["fotoğrafçılık", "yoga", "kitap"], "location": "İzmir"},
    {"name": "Gizem", "age": 24, "gender": "k", "preferred_gender": "e", "preferred_age_range": [22, 28], "hobbies": ["dans", "spor", "müzik"], "location": "Bursa"},
    {"name": "Berk", "age": 27, "gender": "e", "preferred_gender": "k", "preferred_age_range": [24, 30], "hobbies": ["kamp", "fotoğrafçılık", "yürüyüş"], "location": "Antalya"},
    {"name": "İlayda", "age": 29, "gender": "k", "preferred_gender": "e", "preferred_age_range": [27, 32], "hobbies": ["kitap", "yoga", "müzik"], "location": "Trabzon"},
    {"name": "Kaan", "age": 32, "gender": "e", "preferred_gender": "k", "preferred_age_range": [29, 35], "hobbies": ["spor", "kitap", "sinema"], "location": "İstanbul"},
    {"name": "Aslı", "age": 27, "gender": "k", "preferred_gender": "e", "preferred_age_range": [26, 31], "hobbies": ["yürüyüş", "fotoğrafçılık", "dans"], "location": "İzmir"},
    {"name": "Umut", "age": 30, "gender": "e", "preferred_gender": "k", "preferred_age_range": [28, 33], "hobbies": ["müzik", "kamp", "spor"], "location": "Konya"},
    {"name": "Melike", "age": 25, "gender": "k", "preferred_gender": "e", "preferred_age_range": [24, 30], "hobbies": ["sinema", "kitap", "yoga"], "location": "Eskişehir"},
    {"name": "Tuna", "age": 28, "gender": "e", "preferred_gender": "k", "preferred_age_range": [25, 30], "hobbies": ["fotoğrafçılık", "yürüyüş", "kamp"], "location": "Kayseri"},
    {"name": "Simge", "age": 23, "gender": "k", "preferred_gender": "e", "preferred_age_range": [22, 27], "hobbies": ["spor", "müzik", "kitap"], "location": "Bursa"},
    {"name": "Çağrı", "age": 26, "gender": "e", "preferred_gender": "k", "preferred_age_range": [24, 30], "hobbies": ["sinema", "kamp", "fotoğrafçılık"], "location": "İstanbul"},
    {"name": "Pelin", "age": 30, "gender": "k", "preferred_gender": "e", "preferred_age_range": [28, 35], "hobbies": ["kitap", "dans", "spor"], "location": "Gaziantep"},
    {"name": "Serkan", "age": 29, "gender": "e", "preferred_gender": "k", "preferred_age_range": [26, 32], "hobbies": ["yoga", "fotoğrafçılık", "kitap"], "location": "Kocaeli"},
    {"name": "Nazan", "age": 26, "gender": "k", "preferred_gender": "e", "preferred_age_range": [24, 30], "hobbies": ["yürüyüş", "spor", "müzik"], "location": "Ankara"},
    {"name": "Koray", "age": 28, "gender": "e", "preferred_gender": "k", "preferred_age_range": [25, 31], "hobbies": ["kitap", "kamp", "yoga"], "location": "Denizli"},
    {"name": "Sibel", "age": 27, "gender": "k", "preferred_gender": "e", "preferred_age_range": [25, 32], "hobbies": ["fotoğrafçılık", "müzik", "sinema"], "location": "Mersin"},
    {"name": "Baran", "age": 31, "gender": "e", "preferred_gender": "k", "preferred_age_range": [27, 34], "hobbies": ["spor", "kamp", "müzik"], "location": "Samsun"},
    {"name": "Elif", "age": 28, "gender": "k", "preferred_gender": "e", "preferred_age_range": [26, 32], "hobbies": ["fotoğrafçılık", "kitap", "dans"], "location": "İstanbul"},
    {"name": "Yusuf", "age": 26, "gender": "e", "preferred_gender": "k", "preferred_age_range": [24, 30], "hobbies": ["yürüyüş", "spor", "müzik"], "location": "Ankara"},
    {"name": "Zeynep", "age": 27, "gender": "k", "preferred_gender": "e", "preferred_age_range": [25, 31], "hobbies": ["kitap", "yoga", "fotoğrafçılık"], "location": "İzmir"},
    {"name": "Samet", "age": 29, "gender": "e", "preferred_gender": "k", "preferred_age_range": [26, 33], "hobbies": ["kamp", "kitap", "sinema"], "location": "Trabzon"},
    {"name": "Sena", "age": 25, "gender": "k", "preferred_gender": "e", "preferred_age_range": [23, 29], "hobbies": ["dans", "müzik", "fotoğrafçılık"], "location": "Bursa"},
    {"name": "Halil", "age": 32, "gender": "e", "preferred_gender": "k", "preferred_age_range": [29, 35], "hobbies": ["spor", "kitap", "kamp"], "location": "Konya"},
    {"name": "İrem", "age": 26, "gender": "k", "preferred_gender": "e", "preferred_age_range": [24, 30], "hobbies": ["sinema", "müzik", "yoga"], "location": "Kayseri"},
    {"name": "Batuhan", "age": 30, "gender": "e", "preferred_gender": "k", "preferred_age_range": [27, 33], "hobbies": ["fotoğrafçılık", "kitap", "yürüyüş"], "location": "İstanbul"},
    {"name": "Tuğçe", "age": 27, "gender": "k", "preferred_gender": "e", "preferred_age_range": [25, 31], "hobbies": ["kamp", "spor", "dans"], "location": "Antalya"},
    {"name": "Onur", "age": 29, "gender": "e", "preferred_gender": "k", "preferred_age_range": [26, 32], "hobbies": ["kitap", "fotoğrafçılık", "sinema"], "location": "İzmir"},
    {"name": "Esra", "age": 28, "gender": "k", "preferred_gender": "e", "preferred_age_range": [26, 31], "hobbies": ["spor", "müzik", "kamp"], "location": "Eskişehir"},
    {"name": "Oğuz", "age": 27, "gender": "e", "preferred_gender": "k", "preferred_age_range": [25, 30], "hobbies": ["yoga", "kitap", "sinema"], "location": "Ankara"},
    {"name": "Merve", "age": 24, "gender": "k", "preferred_gender": "e", "preferred_age_range": [22, 27], "hobbies": ["fotoğrafçılık", "dans", "yürüyüş"], "location": "Bursa"},
    {"name": "Selim", "age": 26, "gender": "e", "preferred_gender": "k", "preferred_age_range": [24, 30], "hobbies": ["kamp", "müzik", "kitap"], "location": "İstanbul"},
    {"name": "Dila", "age": 29, "gender": "k", "preferred_gender": "e", "preferred_age_range": [27, 33], "hobbies": ["yoga", "sinema", "kitap"], "location": "İzmir"},
    {"name": "Kadir", "age": 30, "gender": "e", "preferred_gender": "k", "preferred_age_range": [27, 32], "hobbies": ["spor", "yürüyüş", "fotoğrafçılık"], "location": "Gaziantep"},
    {"name": "Ceren", "age": 25, "gender": "k", "preferred_gender": "e", "preferred_age_range": [23, 28], "hobbies": ["müzik", "kitap", "dans"], "location": "Mersin"},
    {"name": "Emre", "age": 28, "gender": "e", "preferred_gender": "k", "preferred_age_range": [26, 30], "hobbies": ["fotoğrafçılık", "kamp", "spor"], "location": "Adana"},
    {"name": "Nazlı", "age": 26, "gender": "k", "preferred_gender": "e", "preferred_age_range": [24, 30], "hobbies": ["kitap", "müzik", "yoga"], "location": "Trabzon"},
    {"name": "Sibel", "age": 32, "gender": "k", "preferred_gender": "e", "preferred_age_range": [28, 34], "hobbies": ["sinema", "kitap", "spor"], "location": "Bursa"},
    {"name": "Sibel", "age": 32, "gender": "k", "preferred_gender": "e", "preferred_age_range": [28, 34], "hobbies": ["sinema", "kitap", "spor"], "location": "Bursa"},
    {"name": "Can", "age": 27, "gender": "e", "preferred_gender": "k", "preferred_age_range": [25, 30], "hobbies": ["müzik", "kitap", "yürüyüş"], "location": "İstanbul"},
    {"name": "Burcu", "age": 29, "gender": "k", "preferred_gender": "e", "preferred_age_range": [26, 32], "hobbies": ["fotoğrafçılık", "dans", "sinema"], "location": "Ankara"},
    {"name": "Alper", "age": 30, "gender": "e", "preferred_gender": "k", "preferred_age_range": [28, 34], "hobbies": ["spor", "kitap", "kamp"], "location": "Samsun"},
    {"name": "Büşra", "age": 25, "gender": "k", "preferred_gender": "e", "preferred_age_range": [23, 28], "hobbies": ["müzik", "yoga", "fotoğrafçılık"], "location": "Antalya"},
    {"name": "Serkan", "age": 28, "gender": "e", "preferred_gender": "k", "preferred_age_range": [26, 30], "hobbies": ["kamp", "fotoğrafçılık", "sinema"], "location": "Konya"},
    {"name": "Aylin", "age": 27, "gender": "k", "preferred_gender": "e", "preferred_age_range": [25, 30], "hobbies": ["yoga", "sinema", "fotoğrafçılık"], "location": "Eskişehir"},
    {"name": "Kemal", "age": 31, "gender": "e", "preferred_gender": "k", "preferred_age_range": [27, 33], "hobbies": ["spor", "kitap", "yürüyüş"], "location": "Kayseri"},
    {"name": "Aslı", "age": 26, "gender": "k", "preferred_gender": "e", "preferred_age_range": [24, 30], "hobbies": ["fotoğrafçılık", "kitap", "sinema"], "location": "İzmir"},
    {"name": "Serdar", "age": 29, "gender": "e", "preferred_gender": "k", "preferred_age_range": [27, 32], "hobbies": ["spor", "yoga", "kitap"], "location": "Bursa"},
    {"name": "Gizem", "age": 28, "gender": "k", "preferred_gender": "e", "preferred_age_range": [26, 31], "hobbies": ["kitap", "sinema", "kamp"], "location": "Antalya"},
    {"name": "Hüseyin", "age": 30, "gender": "e", "preferred_gender": "k", "preferred_age_range": [27, 33], "hobbies": ["müzik", "kitap", "spor"], "location": "Adana"},
    {"name": "Cemre", "age": 27, "gender": "k", "preferred_gender": "e", "preferred_age_range": [25, 31], "hobbies": ["fotoğrafçılık", "yoga", "sinema"], "location": "Mersin"},
    {"name": "Alp", "age": 32, "gender": "e", "preferred_gender": "k", "preferred_age_range": [29, 35], "hobbies": ["kamp", "spor", "yoga"], "location": "İstanbul"},
    {"name": "Fatma", "age": 24, "gender": "k", "preferred_gender": "e", "preferred_age_range": [22, 26], "hobbies": ["kitap", "dans", "sinema"], "location": "İzmir"},
    {"name": "Savaş", "age": 28, "gender": "e", "preferred_gender": "k", "preferred_age_range": [25, 30], "hobbies": ["spor", "müzik", "kamp"], "location": "Gaziantep"},
    {"name": "Ayşe", "age": 29, "gender": "k", "preferred_gender": "e", "preferred_age_range": [27, 32], "hobbies": ["fotoğrafçılık", "yoga", "sinema"], "location": "Eskişehir"},
    {"name": "Okan", "age": 30, "gender": "e", "preferred_gender": "k", "preferred_age_range": [28, 34], "hobbies": ["sinema", "spor", "kitap"], "location": "Konya"},
    {"name": "Lale", "age": 27, "gender": "k", "preferred_gender": "e", "preferred_age_range": [25, 30], "hobbies": ["fotoğrafçılık", "müzik", "yoga"], "location": "Samsun"},
    {"name": "Ece", "age": 26, "gender": "k", "preferred_gender": "e", "preferred_age_range": [24, 29], "hobbies": ["kitap", "spor", "kamp"], "location": "Antalya"},
    {"name": "Kerem", "age": 31, "gender": "e", "preferred_gender": "k", "preferred_age_range": [28, 33], "hobbies": ["spor", "sinema", "kitap"], "location": "İstanbul"},
    {"name": "Berkay", "age": 29, "gender": "e", "preferred_gender": "k", "preferred_age_range": [27, 32], "hobbies": ["fotoğrafçılık", "yoga", "spor"], "location": "Eskişehir"},
    {"name": "Merve", "age": 25, "gender": "k", "preferred_gender": "e", "preferred_age_range": [22, 27], "hobbies": ["yoga", "kitap", "spor"], "location": "Ankara"},
    {"name": "Çağrı", "age": 30, "gender": "e", "preferred_gender": "k", "preferred_age_range": [28, 33], "hobbies": ["kitap", "sinema", "yoga"], "location": "İzmir"},
    {"name": "Sevgi", "age": 26, "gender": "k", "preferred_gender": "e", "preferred_age_range": [24, 29], "hobbies": ["yoga", "kamp", "sinema"], "location": "Bursa"},
    {"name": "Hakan", "age": 32, "gender": "e", "preferred_gender": "k", "preferred_age_range": [29, 35], "hobbies": ["spor", "kitap", "fotoğrafçılık"], "location": "Konya"},
    {"name": "Cevdet", "age": 28, "gender": "e", "preferred_gender": "k", "preferred_age_range": [26, 30], "hobbies": ["spor", "sinema", "yoga"], "location": "Mersin"},
    {"name": "Nihan", "age": 27, "gender": "k", "preferred_gender": "e", "preferred_age_range": [25, 30], "hobbies": ["fotoğrafçılık", "sinema", "kamp"], "location": "Antalya"},
    {"name": "Seda", "age": 28, "gender": "k", "preferred_gender": "e", "preferred_age_range": [26, 32], "hobbies": ["yoga", "kitap", "spor"], "location": "İstanbul"},
    {"name": "Tayfun", "age": 29, "gender": "e", "preferred_gender": "k", "preferred_age_range": [27, 31], "hobbies": ["fotoğrafçılık", "yoga", "kamp"], "location": "Kayseri"},
    {"name": "Elif", "age": 32, "gender": "k", "preferred_gender": "e", "preferred_age_range": [28, 34], "hobbies": ["sinema", "yoga", "spor"], "location": "Samsun"},
    {"name": "Efe", "age": 30, "gender": "e", "preferred_gender": "k", "preferred_age_range": [28, 33], "hobbies": ["kamp", "fotoğrafçılık", "kitap"], "location": "Antalya"},
    {"name": "Deniz", "age": 29, "gender": "e", "preferred_gender": "k", "preferred_age_range": [27, 32], "hobbies": ["sinema", "kitap", "yoga"], "location": "Bursa"},
    {"name": "Ekin", "age": 30, "gender": "e", "preferred_gender": "k", "preferred_age_range": [27, 32], "hobbies": ["yoga", "spor", "fotoğrafçılık"], "location": "İzmir"},
    {"name": "Fikret", "age": 31, "gender": "e", "preferred_gender": "k", "preferred_age_range": [28, 33], "hobbies": ["fotoğrafçılık", "spor", "yoga"], "location": "Adana"},
    {"name": "Cansu", "age": 27, "gender": "k", "preferred_gender": "e", "preferred_age_range": [25, 30], "hobbies": ["kitap", "sinema", "yoga"], "location": "Samsun"},
    {"name": "Mehmet", "age": 30, "gender": "e", "preferred_gender": "k", "preferred_age_range": [27, 32], "hobbies": ["spor", "kitap", "yoga"], "location": "Eskişehir"},
    {"name": "İrem", "age": 25, "gender": "k", "preferred_gender": "e", "preferred_age_range": [22, 27], "hobbies": ["fotoğrafçılık", "yoga", "sinema"], "location": "Antalya"},
    {"name": "Gökhan", "age": 28, "gender": "e", "preferred_gender": "k", "preferred_age_range": [26, 31], "hobbies": ["kamp", "spor", "sinema"], "location": "Konya"}
]

# Rastgele mevcut kullanıcıyı seç
current_user = random.choice(users)
users.remove(current_user)  # Kendi kendine önerilmesin

print(f"Mevcut Kullanıcı:\nAd: {current_user['name']}, Yaş: {current_user['age']}, Cinsiyet: {current_user['gender']}")
print(f"Hobileri: {', '.join(current_user['hobbies'])}\n")

# Hobilerin ağırlığını tutan dictionary
hobby_scores = {hobby: 1 for hobby in current_user['hobbies']}

# Beğenilen kullanıcılar listesi
liked_users = []

# Geri kalan kullanıcılar
remaining_users = users.copy()
def is_match(user, current_user):
    return (
        user["gender"] == current_user["preferred_gender"] and
        current_user["gender"] == user["preferred_gender"] and
        user["age"] >= current_user["preferred_age_range"][0] and
        user["age"] <= current_user["preferred_age_range"][1]
    )

def get_random_match(remaining, current_user):
    filtered = [u for u in remaining if is_match(u, current_user)]
    return random.choice(filtered) if filtered else None

def get_best_match(remaining, hobby_scores, current_user):
    def score(user):
        hobby_score = sum([hobby_scores.get(h, 0) for h in user["hobbies"]])
        location_score = 5 if user["location"] == current_user["location"] else 0
        return hobby_score + location_score
    filtered = [u for u in remaining if is_match(u, current_user)]
    if not filtered:
        return None
    return max(filtered, key=score)

# Ana döngü
while remaining_users:
    if liked_users:
        candidate = get_best_match(remaining_users, hobby_scores, current_user)
    else:
        candidate = get_random_match(remaining_users, current_user)

    if not candidate:
        print("Filtrelere uyan başka kullanıcı kalmadı.")
        break

    print(f"\nAday: {candidate['name']}, Yaş: {candidate['age']}, Lokasyon: {candidate['location']}")
    print("Hobileri:", ', '.join(candidate["hobbies"]))
    choice = input("Beğendiniz mi? (Y/N): ").strip().upper()

    remaining_users.remove(candidate)

    if choice == "Y":
        liked_users.append(candidate)
        for hobby in candidate["hobbies"]:
            hobby_scores[hobby] = hobby_scores.get(hobby, 0) + 2
    elif choice != "N":
        print("Geçersiz giriş. Lütfen sadece Y veya N giriniz.")

# En sonunda beğenilenleri yazalım
print("\n🎉 Beğendiğiniz Kişiler:")
for person in liked_users:
    print(f"- {person['name']}, Yaş: {person['age']}, Cinsiyet: {person['gender']}")