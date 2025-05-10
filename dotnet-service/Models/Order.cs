namespace dotnet_service.Models
{

    public enum OrderStatus
    {
        Pending,
        Completed,
        Cancelled
    }
    public enum PaymentStatus
    {
        Pending,
        Paid,
        Failed
    }

    public enum PaymentMethod
    {
        Cash,
        Card,
        Online
    }


    public class Order
    {
        public Guid Id { get; set; }
        public required string OrderId { get; set; }
        public required string UserId { get; set; }
        public required string StoreId { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public decimal SubTotal { get; set; }
        public decimal DeliveryFee { get; set; }
        public decimal Discount { get; set; }
        public required string TransactionId { get; set; }
        public decimal TotalAmount { get; set; }
        public required string DeliveryAddress { get; set; }
        public DateTime? EstimatedDeliveryTime { get; set; }
        public decimal TotalPaid { get; set; }
        public DateTime PlacedAt { get; set; } = DateTime.UtcNow;

        public List<OrderItems> Items { get; set; } = new List<OrderItems>();
    }
}