declare module '*.css' {
  const content: string;
  export default content;
}
interface AddReviewPayload {
  productId: string | number;
  name: string;
  email: string;
  subject: string;
  comment: string;
  rating: number;
}