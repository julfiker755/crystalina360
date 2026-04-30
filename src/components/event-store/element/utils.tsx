export const permissionBoth = ({
  role,
  isSubscribed,
}: {
  role?: string;
  isSubscribed?: boolean;
}) => {
  if (role === "admin") {
    return true;
  } else if (role === "opertor") {
    return isSubscribed;
  }
};
