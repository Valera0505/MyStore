export type CreateCategoryParams = { name: string; type: string };
export type CreateProductParams = {
  name: string;
  price: number;
  size: number;
  categoryName: string;
  amount: number;
  image_url: string;
  description: string;
};
export type CreateBucketParams = { userId: number };
export type RegisterUserParams = { email: string; password: string };
export type SignInUserParams = { email: string; password: string };
