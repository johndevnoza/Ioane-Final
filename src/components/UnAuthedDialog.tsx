import { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";
import { useUsersQuery } from "@/services/usersQuery";

// this component is responsible tell the user that they should be logged in in case they clicked on content wich requires AUTHENTICATION
export const UnAuthedDialog = ({
  children,
  noRestriction = false,
}: {
  children: ReactNode;
  noRestriction?: boolean;
}) => {
  const { data: user } = useUsersQuery();
  return (
    <>
      {user?.first_name || noRestriction ? (
        children
      ) : (
        <AlertDialog>
          <AlertDialogTrigger>{children}</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                You must be Logged in to continue
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Stay as Visitor</AlertDialogCancel>
              <Link to={"/login"}>
                <AlertDialogAction>Log In</AlertDialogAction>
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};
