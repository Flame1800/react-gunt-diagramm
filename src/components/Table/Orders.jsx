import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import Order from "./Order";
import getDuration from "../../functions/getDuration";
import CurrOrder from "./CurrOrder";

const mapPropsToState = (state) => {
  return {
    currDay: state.currDay,
    orders: state.orders,
    rowCoords: state.rowCoords,
    timeCoords: state.timeCoords,
    currOrder: state.currOrder,
  };
};

const actionCreators = {
  setOrders: actions.setOrders,
  clearOrders: actions.clearOrders,
};

function Orders(props) {
  const {
    currOrder,
    clearOrders,
    orders,
    currDay,
    setOrders,
    timeCoords,
    rowCoords,
  } = props;

  const [serverDataState, setServerDataState] = React.useState({
    cars: "loading",
    orders: "loading",
  });

  const loadOrders = (orders) => {
    const newOrders = [];

    orders.forEach((order) => {
      order.date = new Date(order.date);
      timeCoords.forEach((cell) => {
        if (
          cell.time.hour === order.time.start.hour &&
          cell.time.minute === order.time.start.minute
        ) {
          rowCoords.forEach((row) => {
            if (order.location.id === row.id) {
              const endCoordsBlock = timeCoords.filter((cell) => {
                return (
                  cell.time.hour === order.time.end.hour &&
                  cell.time.minute === order.time.end.minute
                );
              })[0].coords;

              const width = endCoordsBlock - cell.coords;

              const styleNewOrder = {
                left: cell.coords,
                top: row.coords,
                width: `${width}px`,
                height: "24px",
              };
              const newOrder = {
                id: Math.random(),
                duration: getDuration(order.time.start, order.time.end),
                style: styleNewOrder,
                ...order,
              };
              newOrders.push(newOrder);
            }
          });
        }
      });
    });
    setOrdersHandle(newOrders);
    setServerDataState({ ...serverDataState, orders: "ready" });
  };

  const setOrdersHandle = (orders) => {
    orders.forEach((order) => setOrders(order));
  };

  // React.useEffect(() => {
  //     if (serverSideCars.length > 0 && timeCoords.length > 0 && serverDataState.orders === 'loading') {
  //         loadOrders(serverSideOrders)
  //     }
  // })

  React.useEffect(() => {
    const dataFrom1C = document.getElementById("data-for-react");
    dataFrom1C.addEventListener("click", () => {
      if (dataFrom1C.dataset.orders) {
        const orders = JSON.parse(dataFrom1C.dataset.orders);
        loadOrders(orders);
      }
    });
  });
  React.useEffect(() => {
    // Перезагрузка страницы при изменении размера окна, для адаптивности блоков с заказами
    window.addEventListener("resize", () => {
      const reservOrders = orders;
      clearOrders(orders);
      setOrdersHandle(reservOrders);
    });
  }, []);

  const renderOrders = (orders) =>
    orders
      .filter((order) => order.date.getDate() === currDay.getDate())
      .map((item) => <Order item={item} />);

  return (
    <>
      {currOrder !== null && <CurrOrder currOrder={currOrder} />}
      {orders.length > 0 && renderOrders(orders)}
    </>
  );
}

const connComponent = connect(mapPropsToState, actionCreators)(Orders);
export default connComponent;
