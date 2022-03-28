import { memo } from "react";

// import { Menu } from "antd";
import { GithubOutlined } from "@ant-design/icons";

const NavRightContent = memo(() => {
  // const dispatch = useAppDispatch();

  // Using the current user
  // const { user } = useAppSelector(state => ({
  //   user: state.auth.user,
  // }));
  // TODO: update this when AUTH method/api changes
  // const name = user?.name ?? "John Doe";
  // const userInitials = getInitials(name, 3);

  return (
    // <Menu mode="horizontal" >
    //   <Menu.Item
    //     key="user"
    //   >
    <a
      href="https://github.com/iTorongo/CS4020-ML-CO2-Emission-Prediction"
      target="_blank"
      style={{ paddingRight: "24px", color: "#000" }}
      rel="noreferrer"
    >
      <GithubOutlined style={{ fontSize: "24px" }} />
    </a>
    //   </Menu.Item>
    // </Menu>
  );
});

export default NavRightContent;
