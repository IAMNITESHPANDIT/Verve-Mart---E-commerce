import CustomButton from "../../../components/customButton/CustomButton";
import "./addressRadio.style.scss";
const AddressRadio = (props: any) => {
  return (
    <div className="addressRadio">
      {props.data.length > 0 &&
        props.data.map((item: any) => (
          <div key={item?.addressId} className="address-item">
            <label>
              <input
                type="radio"
                name="selectedAddress"
                value={item.addressId}
                checked={props.selectedAddress === item.addressId}
                onChange={(e) => props.setSelectedAddress(e.target.value)}
              />
              <span>{item?.name}</span>
              <span>{item?.street}</span>
              <span>{item?.district}</span>
              <span>{item?.phoneNumber}</span>
              <span>{item?.state}</span>
              <span>{item?.pincode}</span>
              {props.selectedAddress === item.addressId && (
                <CustomButton
                  btnName="Deliver on this Address"
                  btnEvent={() => props.onNavigate(item.addressId)}
                />
              )}
            </label>
          </div>
        ))}
    </div>
  );
};
export default AddressRadio;
