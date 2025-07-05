const dummyProducts = {
  chair: [
    {
      id: 1,
      name: "Wooden Chair",
      description: "Comfortable and classic",
      deliveryTime: 2,
      category: "Chairs",
      price: 1299,
      color: "Brown",
      image:
        "https://images.pexels.com/photos/31519049/pexels-photo-31519049/free-photo-of-rustic-wooden-chair-in-outdoor-garden-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      name: "Plastic Chair",
      description: "Lightweight and durable",
      category: "Chairs",
      deliveryTime: 1,
      price: 499,
      color: "White",
      image:
        "https://images.pexels.com/photos/7850509/pexels-photo-7850509.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      name: "Office Chair",
      description: "Ergonomic and adjustable",
      deliveryTime: 3,
      category: "Chairs",
      price: 2899,
      color: "Black",
      image:
        "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ],
  table: [
    {
      id: 4,
      name: "Dining Table",
      description: "Spacious and elegant",
      deliveryTime: 5,
      category: "Tables",
      price: 5999,
      color: "Brown",
      image:
        "https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 5,
      name: "Coffee Table",
      description: "Compact and stylish",
      deliveryTime: 4,
      category: "Tables",
      price: 1999,
      color: "White",
      image:
        "https://media.istockphoto.com/id/1691922005/photo/cozy-stylish-living-room-with-a-round-dining-table-chairs-and-shelf-with-decorative.jpg?b=1&s=612x612&w=0&k=20&c=wzbAUSq5Y870qieKnpD-DOkU7I7l1WudiE-DcTVMMdg=",
    },
    {
      id: 6,
      name: "Study Table",
      description: "Functional and strong",
      deliveryTime: 2,
      category: "Tables",
      price: 3499,
      color: "Black",
      image:
        "https://images.pexels.com/photos/11112745/pexels-photo-11112745.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ],
  sofa: [
    {
      id: 7,
      name: "Leather Sofa",
      description: "Luxurious and soft",
      category: "Sofas",
      deliveryTime: 1,
      price: 11999,
      color: "Beige",
      image:
        "https://media.istockphoto.com/id/2089126618/photo/leather-sofa-with-an-empty-beige-wall-for-mockup.jpg?b=1&s=612x612&w=0&k=20&c=Nft5dLAbzxdKqmmlS7sKkdzZ8ZfKqyzAnDPWdT5kvPc=",
    },
    {
      id: 8,
      name: "Fabric Sofa",
      description: "Cozy and affordable",
      category: "Sofas",
      deliveryTime: 3,
      price: 7999,
      color: "Grey",
      image:
        "https://images.pexels.com/photos/8135269/pexels-photo-8135269.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 9,
      name: "Recliner Sofa",
      description: "Perfect for relaxation",
      category: "Sofas",
      deliveryTime: 1,
      price: 14999,
      color: "Brown",
      image:
        "https://media.istockphoto.com/id/1424803291/photo/close-up-view-of-reclining-chair-in-living-room.jpg?b=1&s=612x612&w=0&k=20&c=a-Sv6Ce0yRptEUPHJM1EbSXUVnnpX8CJfcCuWvkBor4=",
    },
  ],
  single_bed: [
    {
      id: 10,
      name: "Single Bed Classic",
      description: "Comfortable and compact",
      category: "Single Bed",
      price: 4999,
      deliveryTime: 2,
      color: "Brown",
      image:
        "https://images.pexels.com/photos/9899861/pexels-photo-9899861.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 11,
      name: "Single Bed Deluxe",
      description: "Spacious and luxurious",
      category: "Single Bed",
      deliveryTime: 3,
      price: 6499,
      color: "White",
      image:
        "https://images.pexels.com/photos/3288100/pexels-photo-3288100.png?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 12,
      name: "Single Bed Deluxe",
      description: "Spacious and luxurious",
      category: "Single Bed",
      deliveryTime: 4,
      price: 6499,
      color: "White",
      image:
        "https://images.pexels.com/photos/3288100/pexels-photo-3288100.png?auto=compress&cs=tinysrgb&w=600",
    },
  ],
  double_bed: [
    {
      id: 13,
      name: "Double Bed Classic",
      description: "Comfortable and large",
      category: "Double Bed",
      deliveryTime: 4,
      price: 8499,
      color: "Brown",
      image:
        "https://images.pexels.com/photos/9899861/pexels-photo-9899861.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 14,
      name: "Double Bed Deluxe",
      description: "Extra spacious and stylish",
      deliveryTime: 5,
      category: "Double Bed",
      price: 9999,
      color: "White",
      image:
        "https://images.pexels.com/photos/3288100/pexels-photo-3288100.png?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 15,
      name: "Double Bed Deluxe",
      description: "Extra spacious and stylish",
      category: "Double Bed",
      deliveryTime: 3,
      price: 9999,
      color: "White",
      image:
        "https://images.pexels.com/photos/3288100/pexels-photo-3288100.png?auto=compress&cs=tinysrgb&w=600",
    },
  ],
  cupboard: [
    {
      id: 16,
      name: "Wooden Cupboard",
      description: "Durable and stylish",
      deliveryTime: 2,
      category: "Cup board",
      price: 5999,
      color: "Brown",
      image:
        "https://images.pexels.com/photos/6508346/pexels-photo-6508346.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 17,
      name: "Modern Cupboard",
      description: "Spacious and luxurious",
      deliveryTime: 3,
      category: "Cup board",
      price: 7499,
      color: "White",
      image:
        "https://images.pexels.com/photos/6782465/pexels-photo-6782465.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 18,
      name: "Modern Cupboard",
      description: "Spacious and luxurious",
      category: "Cup board",
      deliveryTime: 1,
      price: 7499,
      color: "Grey",
      image:
        "https://images.pexels.com/photos/6957092/pexels-photo-6957092.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ],
};

export default dummyProducts;
