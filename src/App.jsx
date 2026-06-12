import Vendors from "./data/vendors.json"
import Style from "./app.module.scss"
import MacCheck from "./usecase/mac/Mac"
import SerialNumber from "./usecase/sn/Sn"
import Dropdown from "./components/dropdown/dropdown"
import ErrorScreen from "./components/errorScreen/ErrorScreen"
import TextInput from "./components/textInput/textInput"
import { useEffect, useState } from "react"
import { VendorEnums } from "./entities/enums"
import BranchesDataList from "./data/branches.json"
import BranchSearching from "./usecase/branch/Branch"
import CopyField from "./usecase/copyField/CopyField"

function App() {
  const Branches = Object.fromEntries(
    BranchesDataList.branches.map(v => {
      const key = Object.keys(v)[0];
      return [key, key];
    })
  );

  const BranchesSubs = Object.fromEntries(
    BranchesDataList.branches.map(v => Object.entries(v)[0])
  );

  const template = "1)\n2)\n3)\n4)\n5)\n";
  const [vendor,SetVendor] = useState(VendorEnums.CHOICE)
  const [model,SetModel] = useState('')
  const [mac,SetMac] = useState('')
  const [sn,SetSN] = useState('')
  const [error, setError] = useState(new Set())
  const [MacTrigger,SetMacTrigger] = useState(true)
  const [SNTrigger,SetSNTrigger] = useState(true)
  const [abon, SetAbon] = useState('')
  const [branch, SetBranch] = useState('')
  const [copy, SetCopy] = useState(template)

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

  const handleReset = () => {
    SetVendor(VendorEnums.CHOICE);
    SetModel('');
    SetMac('');
    SetSN('');
    setError(new Set());
    SetMacTrigger(true);
    SetSNTrigger(true);
    SetAbon('');
    SetBranch('');
    SetCopy(template); 
  };

  useEffect(()=>{
    SetModel(modelsByVendor[vendor][0])
  },[vendor])

  return (
    <div className={Style.content}>
      <div className={Style.rectangle}>
        <BranchSearching 
          InputFunc={SetBranch}
          InputValue={branch}
          DataFilled={BranchesSubs}
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
      <div className={Style.rectangle}>
        <TextInput
            Type={'text'}
            Value={abon}
            Title={'Договор'}
            OnChange={(e) => SetAbon(e.target.value)}
            Placeholder={'Договор'}
        />
      </div>
      <div className={Style.rectangle}>
        <CopyField
          InputValue={copy}
          InputFunc={SetCopy}
          Branch={branch}
          Model={(vendor || '') + ' ' + (model || '')}
          MAC={mac}
          SN={sn}
          Abon={abon}
        />
      </div>
      <ErrorScreen
        Errors={error}
      />
      <div className={Style.tools}>
        <a 
          href="https://docs.google.com/document/d/1VA0OTdqe1qgIgbZle-fpCZSoBkP9n_aprNjViVgveYY/edit?usp=drivesdk"
          target="_blank" 
        >
          СОП
        </a>
        <button
          onClick={() => handleReset()}
        >
          Очистить все поля
        </button>
      </div>
    </div>
  )
}

export default App
