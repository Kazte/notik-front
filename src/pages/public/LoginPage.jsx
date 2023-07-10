import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser, resetUser } from "../../redux/states/user";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../../models/routes";
import { useEffect } from "react";
import { useState } from "react";
import AuthService from "../../services/auth-service";

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigator = useNavigate()

  const [errors, setErrors] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    dispatch(resetUser());
    navigator(`/${PublicRoutes.login}`, { replace: true });
  }, []);

  const login = async (username, password) => {

    try {
      const data = await AuthService.login(username, password);

      if (data.result) {
        dispatch(createUser({ ...data.user, token: data.token }))

        navigator(`/${PrivateRoutes.private}`, { replace: true })
      } else {
        setErrors(data.errors)
      }

    } catch (err) {
      console.log(err)
    }

  }


  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    const password = e.target[1].value;

    setFetching(true);
    await login(username, password);
    setFetching(false);
  }

  const handleOnChange = () => {
    setErrors([]);
  }

  return (
    <div className="grid place-items-center h-full">
      <div className="flex flex-col items-center justify-center bg-[#1e1e1e] p-4">
        <h1 className="text-4xl font-bold mb-4">Login</h1>

        <form
          onChange={handleOnChange}
          className="flex flex-col gap-8 w-96  text-black"
          onSubmit={handleOnSubmit}
        >

          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm text-white">Username</label>
            <input disabled={fetching} type="username" id="username" className="border border-gray-300 rounded-md px-2 py-1" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm text-white">Password</label>
            <input disabled={fetching} type="password" id="password" className="border border-gray-300 rounded-md px-2 py-1" />
          </div>

          <div className="flex flex-col gap-2">
            {
              errors.map((err, index) => {
                return <p key={index} className="text-red-500 text-sm">{err}</p>
              })
            }
          </div>

          <button type="submit"
            disabled={fetching}
            className="bg-zinc-500 text-white rounded-md px-4 py-2 hover:bg-zinc-600 transition-colors
						disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
						 ">Login</button>
        </form>

        <div className="mt-4">
          <p>Don&#39t have an account? <Link to="/register" className="text-zinc-500 hover:text-zinc-600">Register</Link></p>
        </div>
      </div>
    </div>
  )
}
