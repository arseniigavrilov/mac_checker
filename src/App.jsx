import Vendors from "./data/vendors.json"
import Style from "./app.module.scss"
import MacCheck from "./usecase/mac/Mac"
import SerialNumber from "./usecase/sn/Sn"
import Dropdown from "./components/dropdown/dropdown"
import ErrorScreen from "./components/errorScreen/ErrorScreen"
import TextInput from "./components/text-input/textInput"
import { useEffect, useState } from "react"
import { VendorEnums, FilEnum } from "./entities/enums"

function App() {
  const [vendor,SetVendor] = useState(VendorEnums.CHOICE)
  const [model,SetModel] = useState('')
  const [mac,SetMac] = useState('')
  const [sn,SetSN] = useState('')
  const [error, setError] = useState(new Set())
  const [MacTrigger,SetMacTrigger] = useState(true)
  const [SNTrigger,SetSNTrigger] = useState(true)
  const [abon, SetAbon] = useState('')
  const [fil, SetFil] = useState(FilEnum.UFA)

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
  const handleFilChange = (e) => {
    const inputFil = e.target.value
    SetFil(inputFil)
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
        <Dropdown 
          Title={"Приставка"}
          VendorData={VendorList}
          SelectValue={vendor}
          OnChange={handleVendorChange}
        />
        <Dropdown 
          Title={"Модель"}
          VendorData={modelsByVendor[vendor]}
          SelectValue={model}
          OnChange={handleModelChange}
        />
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
      <div className={Style.rectangle}>
        <Dropdown
            VendorData={Object.values(FilEnum)}
            SelectValue={fil}
            Title={'Филиал'}
            OnChange={handleFilChange}
            
        />
        <TextInput
            Type={'text'}
            Value={abon}
            Title={'Договор'}
            OnChange={(e) => SetAbon(e.target.value)}
            Placeholder={'Впишите договор'}
        />
      </div>
      <button
        className={Style.form}
        onClick={handleCopy}
      >
        Сформировать форму
      </button>
    </div>
  )
}

export default App
