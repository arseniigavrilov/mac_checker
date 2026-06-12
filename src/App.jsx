import Vendors from "./data/vendors.json"
import Style from "./app.module.scss"
import MacCheck from "./usecase/mac/Mac"
import SerialNumber from "./usecase/sn/Sn"
import Dropdown from "./components/dropdown/dropdown"
import ErrorScreen from "./components/errorScreen/ErrorScreen"
import TextInput from "./components/text-input/textInput"
import { useEffect, useState } from "react"
import { VendorEnums } from "./entities/enums"
import BranchesDataList from "./data/branches.json"

function App() {
  const Branches = Object.fromEntries(
    BranchesDataList.branches.map(v => Object.entries(v)[0])
  );

  const [vendor,SetVendor] = useState(VendorEnums.CHOICE)
  const [model,SetModel] = useState('')
  const [mac,SetMac] = useState('')
  const [sn,SetSN] = useState('')
  const [error, setError] = useState(new Set())
  const [MacTrigger,SetMacTrigger] = useState(true)
  const [SNTrigger,SetSNTrigger] = useState(true)
  const [abon, SetAbon] = useState('')
  const [branch, SetBranch] = useState('')

  const VendorList = Vendors.vendors.map(item => item.vendor)
  const macByVendor = Object.fromEntries(
    Vendors.vendors.map(v => [v.vendor, v.mac])
  );
  const modelsByVendor = Object.fromEntries(
    Vendors.vendors.map(v => [v.vendor, v.models])
  );
  const snByVendor = Object.fromEntries(
    Vendors.vendors.map(v => [v.vendor, v.serial])
  );
  const hintByVendor = Object.fromEntries(
    Vendors.vendors.map(v => [v.vendor, v.hint])
  );

  function hasIdWithPrefix (errorSet, prefix) {
      return [...errorSet].some(id => Math.trunc(id / 10) == prefix);
  };

  const handleVendorChange = (e) => {
    const inputVendor = e.target.value
    SetVendor(inputVendor)
    SetMacTrigger(true)
    SetSNTrigger(true)
  }
  const handleModelChange = (e) => {
    const inputModel = e.target.value
    SetModel(inputModel)
  }

  useEffect(()=>{
    SetModel(modelsByVendor[vendor][0])
  },[vendor])

  const handleCopy = () => {
    const textToCopy = `1) ${fil || ''}
2) ${(vendor || '') + ' ' + (model || '')}
3) ${mac || ''}
4) ${sn || ''}
5) ${abon || ''}`;
      navigator.clipboard.writeText(textToCopy)
          .then(() => {
              alert("Скопировано успешно");
          })
          .catch(err => {
              console.error("Не удалось скопировать", err);
          });
  }

  return (
    <div className={Style.content}>
      <div className={Style.rectangle}>
        <TextInput
            Type={'text'}
            Value={branch}
            Title={'Филиал'}
            OnChange={(e) => SetBranch(e.target.value)}
            Placeholder={'Населенный пункт'}
            
        />
        <TextInput
            Type={'text'}
            Value={abon}
            Title={'Договор'}
            OnChange={(e) => SetAbon(e.target.value)}
            Placeholder={'Договор'}
        />
      </div>
      <div className={Style.rectangle}>
        <Dropdown 
          Title={"Приставка"}
          Data={VendorList}
          SelectValue={vendor}
          OnChange={handleVendorChange}
        />
        <Dropdown 
          Title={"Модель"}
          Data={modelsByVendor[vendor]}
          SelectValue={model}
          OnChange={handleModelChange}
        />
      </div>
      <div className={Style.rectangle}>
        <MacCheck
          MacFilter={macByVendor[vendor]}
          Trigger={MacTrigger}
          SetTrigger={SetMacTrigger}
          Errors={hasIdWithPrefix(error,1)}
          SetErrors={setError}
          Placeholder={'MAC адрес устройства'}
          InputValue={mac}
          InputFunc={SetMac}
          Hint={macByVendor[vendor] && ('MAC должен начинаться с ' + macByVendor[vendor])}
        />
      </div>
      <div className={Style.rectangle}>
        <SerialNumber
          SnRegex={new RegExp(snByVendor[vendor])}
          Hint={hintByVendor[vendor]}
          Trigger={SNTrigger}
          SetTrigger={SetSNTrigger}
          Errors={hasIdWithPrefix(error,2)}
          SetErrors={setError}
          Placeholder={'Серийный номер устройства'}
          InputValue={sn}
          InputFunc={SetSN}
        />
      </div>
      <ErrorScreen
        Errors={error}
      />
    </div>
  )
}

export default App
