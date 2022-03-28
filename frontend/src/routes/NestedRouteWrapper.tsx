import { Switch, Route } from "react-router-dom";

import { RouteComponentDef, RouteItemDef } from "@app/types/route.types";

interface NestedRouteWrapperProps {
  routesWithComponents: RouteItemDef[];
}

const NestedRouteWrapper = ({
  routesWithComponents,
}: NestedRouteWrapperProps) => {
  return (
    <Switch>
      {routesWithComponents.map(route => (
        <Route
          exact
          key={route.id}
          path={route.path}
          render={routeProps => {
            const Component = route.component as RouteComponentDef;
            return <Component {...routeProps} />;
          }}
        />
      ))}
    </Switch>
  );
};

export default NestedRouteWrapper;
