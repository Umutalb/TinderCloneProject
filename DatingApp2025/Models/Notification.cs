namespace DatingApp2025.Models
{
    public class Notification
    {
        public string Id { get; set; }                      // Firestore document ID
        public string UserId { get; set; }                  // Bildirimi alacak kullanıcı
        public string Type { get; set; }                    // "match", "system" gibi tipler
        public string Message { get; set; }                 // Bildirim mesajı (örnek: "Umut seni beğendi!")
        public bool IsRead { get; set; }                    // Okundu mu
        public DateTime CreatedAt { get; set; }             // Ne zaman oluşturuldu
    }
}
