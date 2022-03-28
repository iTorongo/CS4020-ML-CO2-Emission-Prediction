import { memo } from "react";

import { Menu } from "antd";

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
    <Menu mode="horizontal" theme="dark">
      <Menu.SubMenu
        key="user"
        popupOffset={[-16, 7]}
        // title={
        //   <Avatar shape="square" style={{ backgroundColor: "#87d068" }} size={40}>
        //     CO2
        //   </Avatar>
        // }
      />
    </Menu>
  );
});

export default NavRightContent;
