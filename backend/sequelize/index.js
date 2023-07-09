const Sequelize = require("sequelize");
const databaseConfig = require("./config/database");
const UserModel = require("../models/user");
const AccountModel = require("../models/account");
const ReviewModel = require("../models/review");
const CreditCardModel = require("../models/creditCard");
const OrderModel = require("../models/order");
const ItemModel = require("../models/item");
const OrderItemModel = require("../models/orderItem");
const PaymentModel = require("../models/payment");
const ReturnModel = require("../models/return");
const ReturnLineItemModel = require("../models/returnLineItem");
const CartItem = require("../models/CartItem");
const slider = require("../models/slider");
const address = require("../models/address");

// Create an instance of Sequelize

const sequelize = new Sequelize(
  databaseConfig.DB_NAME,
  databaseConfig.DB_USER,
  databaseConfig.DB_PASSWORD,
  {
    host: "localhost",
    dialect: databaseConfig.DB_DIALECT,
  }
);

// Initialize the models
const User = UserModel(sequelize, Sequelize);
const Account = AccountModel(sequelize, Sequelize);
const Review = ReviewModel(sequelize, Sequelize);
const CreditCard = CreditCardModel(sequelize, Sequelize);
const Order = OrderModel(sequelize, Sequelize);
const Item = ItemModel(sequelize, Sequelize);
const OrderItem = OrderItemModel(sequelize, Sequelize);
const Payment = PaymentModel(sequelize, Sequelize);
const Return = ReturnModel(sequelize, Sequelize);
const ReturnLineItem = ReturnLineItemModel(sequelize, Sequelize);
const cartItem = CartItem(sequelize, Sequelize);
const Address = address(sequelize, Sequelize);
const Slider = slider(sequelize, Sequelize);

// Establish the associations between the models
User.hasOne(Account);
Account.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

User.hasMany(CreditCard);
CreditCard.belongsTo(User);

Account.hasMany(Order);
Order.belongsTo(Account);

Item.hasMany(OrderItem);
OrderItem.belongsTo(Item);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Order.hasMany(Payment);
Payment.belongsTo(Order);

Order.hasMany(Return);
Return.belongsTo(Order);

Return.hasMany(ReturnLineItem);
ReturnLineItem.belongsTo(Return);

// Export the initialized Sequelize instance and models
module.exports = {
  sequelize,
  User,
  Account,
  Review,
  CreditCard,
  Order,
  Item,
  OrderItem,
  Payment,
  Return,
  ReturnLineItem,
  cartItem,
  Slider,
  Address,
};
