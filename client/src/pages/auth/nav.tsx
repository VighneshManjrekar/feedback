import { TokensIcon } from "@radix-ui/react-icons";
import { Component } from "react";
import { Button } from "../../components/ui/button";

type Props = {};

type State = {};

export default class NavBar extends Component<Props, State> {
  state = {};

  render() {
    return (
      <nav className="z-10 w-full h-[10vh] absolute font-Geist px-2">
        <div className="p-6 flex w-full place-content-between items-center">
          <div className="flex items-center space-x-2">
            <TokensIcon className="w-8 h-8 bg-black lg:border rounded-lg p-1 lg:block" color="white" />
            <span className="text-black lg:text-white text-lg font-semibold">Acme Inc</span>
          </div>
          <Button className="rounded-lg">Login</Button>
        </div>
      </nav>
    );
  }
}
