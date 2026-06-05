export const ErrorInfo = ({ message = "문제가 발생했습니다." }: { message?: string }) => {
  return <div>{message && <p>{message}</p>}</div>;
};
