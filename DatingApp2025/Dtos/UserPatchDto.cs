using System;
using System.Collections.Generic;

namespace DatingApp2025.Dtos
{
    public class UserPatchDto
    {
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Bio { get; set; }
        public string? Gender { get; set; }
        public string? SexualOrientation { get; set; }
        public string? Location { get; set; }
        public string? ProfilePictureUrl { get; set; }
        public List<string>? Hobbies { get; set; }
        public string? Occupation { get; set; }
        public DateTime? Birthdate { get; set; }
    }
}
