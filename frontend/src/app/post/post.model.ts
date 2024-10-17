export interface Post {
  _id: String;
  userId: String;
  content: String;
  createdAt: Date;
  users: Array<any>;
  avatar: any;
}
