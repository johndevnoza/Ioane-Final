import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { getAccesToken } from "@/services/baseURLAxios";
// this hook is responsible to automaticly redirect users to the login page, if they dont have a permission
const UseProtectedRoute = () => {
  const navigate = useNavigate();
  const token = getAccesToken();

  return (
    <>
      {token ? (
        <Outlet />
      ) : (
        <AlertDialog defaultOpen>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                You must be Logged in to continue
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button onClick={() => navigate(-1)} variant={"secondary"}>
                Go back
              </Button>
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
export default UseProtectedRoute;
