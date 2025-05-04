using Microsoft.AspNetCore.Mvc;
using Google.Cloud.Firestore;
using DatingApp2025.Models;
using DatingApp2025.Dtos;

namespace DatingApp2025.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly FirestoreDb _firestoreDb;

        public UsersController()
        {
            var pathToCredentials = Path.Combine(Directory.GetCurrentDirectory(), "firebase-config", "serviceAccountKey.json");
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", pathToCredentials);

            _firestoreDb = FirestoreDb.Create("datingapp2025-cec19");
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            List<User> users = new List<User>();

            Query usersQuery = _firestoreDb.Collection("users");
            QuerySnapshot usersSnapshot = await usersQuery.GetSnapshotAsync();

            foreach (DocumentSnapshot document in usersSnapshot.Documents)
            {
                User user = document.ConvertTo<User>();
                user.Id = document.Id;
                users.Add(user);
            }
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserId(string id)
        {
            DocumentReference userId = _firestoreDb.Collection("users").Document(id);
            DocumentSnapshot userIdSnapshot = await userId.GetSnapshotAsync();

            if (!userIdSnapshot.Exists)
            {
                return NotFound($"User with ID {id} not found.");
            }

            User user = userIdSnapshot.ConvertTo<User>();
            user.Id = userIdSnapshot.Id;

            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            Query emailCheck = _firestoreDb.Collection("users").WhereEqualTo("email", user.Email);

            QuerySnapshot emailCheckSnapshot = await emailCheck.GetSnapshotAsync();

            if (emailCheckSnapshot.Count > 0)
            {
                return BadRequest("Bu email adresi zaten kullanılıyor.");
            }

            user.CreatedAt = DateTime.UtcNow;
            user.IsVerified = false;

            DocumentReference userNew = await _firestoreDb.Collection("users").AddAsync(user);

            user.Id = userNew.Id;

            return Ok(user);

        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchUser(string id, [FromBody] UserPatchDto data)


        {
            DocumentReference userRef = _firestoreDb.Collection("users").Document(id);
            DocumentSnapshot userSnapshot = await userRef.GetSnapshotAsync();

            if (!userSnapshot.Exists)
                return NotFound($"User with ID {id} not found.");

            User existingUser = userSnapshot.ConvertTo<User>();

            if (data.Username != null) existingUser.Username = data.Username;
            if (data.Email != null) existingUser.Email = data.Email;
            if (data.Bio != null) existingUser.Bio = data.Bio;
            if (data.Location != null) existingUser.Location = data.Location;
            if (data.ProfilePictureUrl != null) existingUser.ProfilePictureUrl = data.ProfilePictureUrl;
            if (data.Hobbies != null) existingUser.Hobbies = data.Hobbies;
            if (data.Occupation != null) existingUser.Occupation = data.Occupation;
            if (data.Birthdate.HasValue) existingUser.Birthdate = data.Birthdate.Value;

            await userRef.SetAsync(existingUser);

            return Ok(new { message = "User updated successfully" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            Query findEmail = _firestoreDb.Collection("users").WhereEqualTo("email", loginDto.Email);
            QuerySnapshot findEmailSnapshot = await findEmail.GetSnapshotAsync();

            if (findEmailSnapshot.Count == 0)
            {
                return Unauthorized("Invalid email or password.");
            }

            DocumentSnapshot userSnapshot = findEmailSnapshot.Documents.FirstOrDefault();
            if (userSnapshot == null || !userSnapshot.Exists)
                return Unauthorized("Invalid email or password.");

            User user = userSnapshot.ConvertTo<User>();

            if (user.Password != loginDto.Password)
            {
                return Unauthorized("Invalid email or password.");
            }

            user.Password = null;

            return Ok(user);
        }
    }
}
