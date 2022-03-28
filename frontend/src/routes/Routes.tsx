import { ElementType, memo } from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import HeaderLayout from "@app/components/layouts/HeaderLayout/HeaderLayout";
// import { useAppSelector } from "@app/redux/store";
import { RouteComponentDef, RouteItemDef } from "@app/types/route.types";

import NotFound from "./components/NotFound/NotFound";
import { PUBLIC_LIST } from "./routes.config";

/**
 * Change the default layout to:
 * - HeaderLayout
 * - SidebarLayout
 */
const DefaultLayout = HeaderLayout;

const Routes = () => {
  const routeWrapper = ({ id, path, layout, component }: RouteItemDef) => {
    const Layout = (layout ?? DefaultLayout) as ElementType;
    return (
      <Route
        key={id}
        path={path}
        render={routeProps => {
          const Component = component as RouteComponentDef;
          const renderContent = (
            <Layout>
              <Component {...routeProps} />
            </Layout>
          );

          return renderContent;
        }}
      />
    );
  };

  return (
    <Switch>
      <Redirect exact from="/" to="/home" />

      {PUBLIC_LIST.map(route => routeWrapper(route))}
      <Route
        path="*"
        render={() => (
          <DefaultLayout>
            <NotFound />
          </DefaultLayout>
        )}
      />
    </Switch>
  );
};

export default memo(Routes);
