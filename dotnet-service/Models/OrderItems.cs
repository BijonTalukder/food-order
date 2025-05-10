namespace dotnet_service.Models{
    public class OrderItems{
        public int Id{get;set;}
        public int OrderId{get;set;}
        public string? ProductId{get;set;}
        public string? ProductName {get;set;}
        public decimal Price {get;set;}
        public int Quantity {get;set;}
        public string? SelectedOptions {get;set;}
        public string? SpecialInstructions { get; set; }


    
    
    }


}