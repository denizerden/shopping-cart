// Front end will send this JSON:
const frontEndData = {
  title: 'Product title',
  description: 'Lorem ipsum dolor sit amet',
  imageURL: 'https://picsum.photos/200',
  options: {
    color1: {
      type: 'color',
      text: 'kirmizi',
      value: 'rgba(128, 0, 0, 1)',
    },
    color2: {
      type: 'color',
      text: 'mavi',
      value: 'rgba(0, 128, 255, 1)',
    },
    size1: {
      type: 'size',
      text: 'S',
      value: 's',
    },
  },
  prices: [
    {
      validFrom: new Date(),
      validTo: new Date(),
      currency: 'TRY',
      originalPrice: '2.00',
      discountedPrice: '1.00',
      discountRate: '0.5',
      // stock: '10',
      // isActive: 'true',
      options: ['color1', 'size1'],
    },
  ],
};

// Database structure:
const databaseData = {
  // Options collection
  collection_options: [
    {
      _id: ObjectId('5d1f192e0479e96d07e77790'),
      type: 'size',
      text: 'S',
      value: 's',
    },
    {
      _id: ObjectId('5d1f2bf88a0e9f77626ba5fd'),
      type: 'color',
      text: 'Crimson',
      value: 'rgba(128, 0, 0, 1)',
    },
  ],
  // Prices collection
  collection_prices: [
    {
      _id: ObjectId('5d1f2c1fcc0fbefa7c7b3953'),
      validFrom: ISODate('2019-07-05T10:53:19.648+00:00'),
      validTo: ISODate('2019-07-05T10:53:19.648+00:00'),
      currency: 'TRY',
      originalPrice: 2, //  One of these three does not
      discountedPrice: 1, //  need to be saved in the
      discountRate: 0.5, //  database.
      stock: 10,
      isActive: true,
      options: [
        ObjectId('5d1f192e0479e96d07e77790'),
        ObjectId('5d1f2bf88a0e9f77626ba5fd'),
      ],
    },
  ],

  // Products collection
  collection_products: [
    {
      _id: ObjectId(''),
      title: 'Product title',
      description: 'Lorem ipsum dolor sit amet',
      image_url: 'https://picsum.photos/200',
      prices: [ObjectId('5d1f2c1fcc0fbefa7c7b3953')],
    },
  ],
};
