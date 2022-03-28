import { memo, ReactNode } from "react";

import { Layout, PageHeader, PageHeaderProps, Divider } from "antd";
import { Route } from "antd/lib/breadcrumb/Breadcrumb";
import cx from "classnames";
import { Link } from "react-router-dom";

import styles from "./ContentLayout.module.scss";

const { Content } = Layout;

type ContentLayoutProps = {
  isHeader?: boolean;
  header: PageHeaderProps;
  filters?: ReactNode;
  children: ReactNode;
  noContentStyle?: boolean;
};

const ContentLayout = memo(
  ({
    isHeader,
    header,
    filters,
    children,
    noContentStyle,
  }: ContentLayoutProps) => {
    // Add custom breadcrumb item render to support Link from react-router-dom
    const renderBreadcrumbItem = (
      route: Route,
      params: unknown,
      routes: Route[]
    ) => {
      const last = routes.indexOf(route) === routes.length - 1;
      return last ? (
        <span>{route.breadcrumbName}</span>
      ) : (
        <Link to={route.path}>{route.breadcrumbName}</Link>
      );
    };

    return (
      <Layout className={styles.container}>
        {isHeader && (
          <PageHeader
            ghost={false}
            {...header}
            breadcrumb={{
              itemRender: renderBreadcrumbItem,
              ...header.breadcrumb,
            }}
            className={cx(styles.pageHeader, header.className)}
          />
        )}

        <Content className={cx({ [styles.content]: !noContentStyle })}>
          {filters && (
            <>
              <div className={cx(styles.filters)}>{filters}</div>
              <Divider className={styles.divider} />
            </>
          )}
          {children}
        </Content>
      </Layout>
    );
  }
);

export default ContentLayout;
