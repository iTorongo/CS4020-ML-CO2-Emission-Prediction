import { memo } from "react";

import { GlobalOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { MenuProps } from "antd/lib/menu";
import cx from "classnames";

// import logo from "@app/assets/images/co2.png";

import NavMenu from "../NavMenu/NavMenu";
import styles from "./NavLeftContent.module.scss";

interface NavLeftContentProps {
  mode?: MenuProps["mode"];
}

const NavLeftContent = memo(({ mode = "horizontal" }: NavLeftContentProps) => {
  const isSidebar = mode === "inline";

  return (
    <>
      <div
        className={cx(styles.logoContainer, {
          [styles.isSidebar]: isSidebar,
        })}
      >
        {/* <img className={styles.logo} src={logo} alt="logo" /> */}
        <Avatar
          style={{ backgroundColor: "#87d068" }}
          size={50}
          icon={<GlobalOutlined />}
        />
      </div>
      <NavMenu mode={mode} isSidebar={isSidebar} />
    </>
  );
});

export default NavLeftContent;
