export const activeItemsData = [
  {
    id: "1",
    name: "Nike Shoe",
    price: 200,
    isSold: false,
    img: "/assets/items/nike-shoe.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates harum, tempore dignissimos fugit omnis atque ratione excepturi fugiat asperiores praesentium perferendis, vitae possimus quisquam nemo rerum nam labore officiis corrupti",
    activeBids: [
      {
        id: "1",
        user: {
          name: "Anika",
          avatar: "/assets/avatars/avatar-anika-visser.png",
        },
        amount: 240,
        status: "active",
      },
      {
        id: "2",
        user: {
          name: "Fran",
          avatar: "/assets/avatars/avatar-fran-perez.png",
        },
        amount: 230,
        status: "active",
      },
      {
        id: "3",
        user: {
          name: "Coa Yu",
          avatar: "/assets/avatars/avatar-cao-yu.png",
        },
        amount: 215,
        status: "active",
      },
      {
        id: "4",
        user: {
          name: "Iulia Albu",
          avatar: "/assets/avatars/avatar-iulia-albu.png",
        },
        amount: 205,
        status: "active",
      },
    ],
    rejectedBids: [],
  },
  {
    id: "2",
    img: "/assets/items/watch.png",
    isSold: false,
    name: "Rolex Watch",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates harum, tempore dignissimos fugit omnis atque ratione excepturi fugiat asperiores praesentium perferendis, vitae possimus quisquam nemo rerum nam labore officiis corrupti",
    price: 300,
    activeBids: [
      {
        id: "5",
        user: {
          name: "Jane",
          avatar: "/assets/avatars/avatar-jane-rotanson.png",
        },
        amount: 330,
        status: "active",
      },
    ],
    rejectedBids: [
      {
        id: "6",
        user: {
          name: "Omar",
          avatar: "/assets/avatars/avatar-omar-darboe.png",
        },
        amount: 301,
        status: "rejected",
      },
    ],
  },
  {
    id: "3",
    img: "/assets/items/iphone-7.png",
    isSold: false,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates harum, tempore dignissimos fugit omnis atque ratione excepturi fugiat asperiores praesentium perferendis, vitae possimus quisquam nemo rerum nam labore officiis corrupti",
    name: "iPhone 7",
    price: 100,
    activeBids: [],
    rejectedBids: [],
  },
];

export const soldItemsData = [
  {
    id: "4",
    name: "Calculator",
    price: 25,
    acceptedBid: {
      id: "7",
      user: {
        name: "Carson",
        avatar: "/assets/avatars/avatar-carson-darrin.png",
      },
      amount: 26,
      status: "active",
    },
    activeBids: [
      {
        id: "7",
        user: {
          name: "Carson",
          avatar: "/assets/avatars/avatar-carson-darrin.png",
        },
        amount: 26,
        status: "active",
      },
    ],
    rejectedBids: [],
    isSold: true,
    img: "/assets/items/calculator.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates harum, tempore dignissimos fugit omnis atque ratione excepturi fugiat asperiores praesentium perferendis, vitae possimus quisquam nemo rerum nam labore officiis corrupti",
  },
];
