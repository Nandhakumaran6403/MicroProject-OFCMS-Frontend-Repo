import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import AdminMain from "./components/Admin/AdminMain";
import EmployeeMain from "./components/Employee/EmployeeMain";
import UserMain from "./components/Customer/UserMain";
import Register from "./components/Register";
import CartPage from "./components/Cart/CartPage";
import CheckoutPage from "./components/Payment/CheckoutPage";
import PaymentPage from "./components/Payment/PaymentPage";
import CustomerEdit from "./pages/Customer/CustomerEdit";
import CustomerView from "./pages/Customer/CustomerView";
import CustomerViewAll from "./pages/Customer/CustomerViewAll";
import OtpPage from "./components/Payment/OtpPage";
import OtpPageUpi from "./components/Payment/OtpPageUpi";
import OrderHistoryPage from "./pages/Order/OrderHistory";
import OrderUserView from "./pages/Order/OrderUserView";
import ReturnAdd from "./pages/Return/ReturnAdd";
import CancelAdd from "./pages/Cancel/CancelAdd";
import OrderConfirmationPage from "./components/Payment/OrderConfirmationPage";
import UserNavbar from "./components/Customer/UserNavbar";
import UserProfile from "./components/Customer/UserProfile";
import StaffProfile from "./components/Employee/EmployeeProfile";
import AdminProfile from "./components/Admin/AdminProfile";
import OrderViewAll from "./pages/Order/OrderViewAll";
import OrderView from "./pages/Order/OrderView";
import OrderEdit from "./pages/Order/OrderEdit";
// import CancelView from "./pages/Cancel/CancelView";
// import CancelViewAll from "./pages/Cancel/CancelViewAll";
// import CancelEdit from "./pages/Cancel/CancelEdit";
// import CancelSpecific from "./pages/Cancel/CancelSpecific";
// import CancelUserView from "./pages/Cancel/CancelUserView";
import InventoryAdd from "./pages/Inventory/InventoryAdd";
import InventoryEdit from "./pages/Inventory/InventoryEdit";
import InventoryView from "./pages/Inventory/InventoryView";
import InventoryViewAll from "./pages/Inventory/InventoryViewAll";
import WarehouseAdd from "./pages/Warehouse/WarehouseAdd";
import WarehouseEdit from "./pages/Warehouse/WarehouseEdit";
import WarehouseView from "./pages/Warehouse/WarehouseView";
import WarehouseViewAll from "./pages/Warehouse/WarehouseViewAll";
import ShipmentAdd from "./pages/Shipment/ShipmentAdd";
import ShipmentEdit from "./pages/Shipment/ShipmentEdit";
import ShipmentView from "./pages/Shipment/ShipmentView";
import ShipmentsViewAll from "./pages/Shipment/ShipmentViewAll";
import InvoiceView from "./pages/Order/InvoiceView";
import ProductsPage from "./components/Employee/ProductsPage";
import ReturnAndCancelPage from "./components/Employee/ReturnAndCancelPage";
import StockLevelsPage from "./components/Employee/StockLevelsPage";
import ShipmentsPage from "./components/Employee/ShipmentsPage";
import ReturnView from "./pages/Return/ReturnView";
import ReturnViewAll from "./pages/Return/ReturnViewAll";
import ReturnEdit from "./pages/Return/ReturnEdit";
import ReturnSpecific from "./pages/Return/ReturnSpecific";
import ReturnUserView from "./pages/Return/ReturnUserView";
import AdministrativeUserAdd from "./pages/AdministrativeUser/AdministrativeUserAdd";
import AdministrativeUserEdit from "./pages/AdministrativeUser/AdministrativeUserEdit";
import AdministrativeUserView from "./pages/AdministrativeUser/AdministrativeUserView";
import AdministrativeUserViewAll from "./pages/AdministrativeUser/AdministrativeUserviewAll";
import { LockProvider } from "./pages/AuditLog/LockContext";
import AuditLogAdd from "./pages/AuditLog/AuditLogAdd";
import AuditLogEdit from "./pages/AuditLog/AuditLogEdit";
import AuditLogView from "./pages/AuditLog/AuditLogView";
import AuditLogSpecific from "./pages/AuditLog/AuditLogSpecific";
import AuditLogSpecificStaff from "./pages/AuditLog/AuditLogSpecificStaff";
import AuditLogViewAll from "./pages/AuditLog/AuditLogViewAll";
import NotFound from "./components/NotFound";
import ProductViewAll from "./pages/ProductBlob/ProductViewAll";
import ProductAdd from "./pages/ProductBlob/ProductAdd";
import ProductEdit from "./pages/ProductBlob/ProductEdit";
import ProductView from "./pages/ProductBlob/ProductView";
import Contact from "./components/Contact";
import About from "./components/About";

function AppRouter() {

  return (
    <LockProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
        
        <Route path="/usermain" element={<><UserMain /></>} />
        <Route path="/employeemain" element={<><EmployeeMain /></>} />
        <Route path="/adminmain" element={<><AdminMain /></>} />
        <Route path="/contact" element={<><Contact /></>} />
        <Route path="/about" element={<><About /></>} />

        <Route path="/userprofile" element={<><UserNavbar/><UserProfile /></>} />
        <Route path="/employeeprofile" element={<><StaffProfile /></>} />
        <Route path="/adminprofile" element={<><AdminProfile /></>} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login  />} />
        <Route path="/cart" element={<><UserNavbar/><CartPage  /></>} />
        <Route path="/checkout" element={<><UserNavbar/><CheckoutPage  /></>} />
        <Route path="/payment" element={<><UserNavbar/><PaymentPage  /></>} />


        <Route path="/productadd" element={<ProductAdd />} />
        <Route path="/productedit/:id" element={<ProductEdit  />} />
        <Route path="/productview/:id" element={<ProductView  />} />
        <Route path="/productviewall" element={<ProductViewAll  />} />
        

        <Route path="/adminuseradd" element={<AdministrativeUserAdd />} />
        <Route path="/adminuseredit/:id" element={<AdministrativeUserEdit  />} />
        <Route path="/adminuserview/:id" element={<AdministrativeUserView  />} />
        <Route path="/adminuserviewall" element={<AdministrativeUserViewAll  />} />

        <Route path="/auditlogadd" element={<><AuditLogAdd /></>} />
        <Route path="/auditlogedit/:id" element={<AuditLogEdit />} />
        <Route path="/auditlogview/:id" element={<><AuditLogView /></>} />
        <Route path="/auditlogspecific/:id" element={<><AuditLogSpecific /></>} />
        <Route path="/auditlogspecificstaff/:id" element={<><AuditLogSpecificStaff /></>} />
        <Route path="/auditlogviewall" element={<><AuditLogViewAll /></>} />

        <Route path="/customeredit/:id" element={<><UserNavbar/><CustomerEdit  /></>} />
        <Route path="/customerview/:id" element={<CustomerView  />} />
        <Route path="/customerviewall" element={<CustomerViewAll  />} />

        <Route path="/otppage" element={<OtpPage />} />
        <Route path="/otppageupi" element={<OtpPageUpi />} />

        <Route path="/orderconfirm" element={<><UserNavbar/><OrderConfirmationPage /></>} />
        <Route path="/orderhistory" element={<><UserNavbar/><OrderHistoryPage /></>} />
        <Route path="/orderuserview/:id" element={<><UserNavbar/><OrderUserView /></>} />
        <Route path="/returnadd/:id" element={<><UserNavbar/><ReturnAdd /></>} />
        <Route path="/canceladd/:id" element={<><UserNavbar/><CancelAdd /></>} />


        <Route path="/orderview/:id" element={<><OrderView /></>} />
        <Route path="/orderviewall" element={<><OrderViewAll /></>} />
        <Route path="/orderedit/:id" element={<><OrderEdit /></>} />

        {/* <Route path="/cancelview/:id" element={<><CancelView /></>} />
        <Route path="/cancelviewall" element={<><CancelViewAll /></>} />
        <Route path="/canceledit/:id" element={<><CancelEdit /></>} />
        <Route path="/cancelspecific/:id" element={<><UserNavbar/><CancelSpecific /></>} />
        <Route path="/canceluserview/:id" element={<><UserNavbar/><CancelUserView /></>} /> */}


        <Route path="/returnview/:id" element={<><ReturnView /></>} />
        <Route path="/returnviewall" element={<><ReturnViewAll /></>} />
        <Route path="/returnedit/:id" element={<><ReturnEdit /></>} />
        <Route path="/returnspecific/:id" element={<><UserNavbar/><ReturnSpecific /></>} />
        <Route path="/returnuserview/:id" element={<><UserNavbar/><ReturnUserView /></>} />

        <Route path="/inventoryadd" element={<><InventoryAdd /></>} />
        <Route path="/inventoryedit/:id" element={<><InventoryEdit /></>} />
        <Route path="/inventoryview/:id" element={<><InventoryView /></>} />
        <Route path="/inventoryviewall" element={<><InventoryViewAll /></>} />


        <Route path="/warehouseadd" element={<><WarehouseAdd /></>} />
        <Route path="/warehouseedit/:id" element={<><WarehouseEdit /></>} />
        <Route path="/warehouseview/:id" element={<><WarehouseView /></>} />
        <Route path="/warehouseviewall" element={<><WarehouseViewAll /></>} />


        <Route path="/shipmentadd/:id" element={<><ShipmentAdd /></>} />
        <Route path="/shipmentedit/:id" element={<><ShipmentEdit /></>} />
        <Route path="/shipmentview/:id" element={<><ShipmentView /></>} />
        <Route path="/shipmentviewall" element={<><ShipmentsViewAll /></>} />

        <Route path="/invoiceview/:id" element={<><InvoiceView /></>} />


        <Route path="/productspage" element={<><ProductsPage /></>} />
        <Route path="/returnandcancelpage" element={<><ReturnAndCancelPage /></>} />
        <Route path="/stocklevelspage" element={<><StockLevelsPage /></>} />
        <Route path="/shipmentspage" element={<><ShipmentsPage /></>} />

      </Routes>
    </Router>
      </LockProvider>


  );
}

export default AppRouter;
