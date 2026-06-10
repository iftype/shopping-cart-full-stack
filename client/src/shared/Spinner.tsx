export const Spinner = ({ message = "로딩 중입니다..." }: { message?: string }) => {
  return <div>{message && <p>{message}</p>}</div>;
};
