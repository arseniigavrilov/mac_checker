export const InputType = {
  DROPDOWN: 'DROPDOWN',
  INPUT: 'INPUT',
};

export const MacErrors = {
    INVALID_MAC: {
        "id":11,
        "text":'Недопустимый MAC адрес'
    },
    INVALID_VENDOR_MAC: {
        "id":12,
        "text":'MAC адрес не подходит для конкретного вендора'
    },
}

export const SNErrors = {
    INVALID_SN: {
        "id":21,
        "text":'Неправильный S/N устройства'
    },
}

export const VendorEnums = {
    CHOICE: "Выберите вендора",
    VERMAX: "Vermax",
    IMAQLIQ: "Imaqliq",
    TVIP: "TVIP",
    WRTECH: "WRTECH",
}