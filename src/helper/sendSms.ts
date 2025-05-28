export const sendSms = (numbers: string[], message: string) => {
  numbers.forEach((number) => {
    const smsLink = `sms:${number}?body=${message}`

    window.location.href = smsLink;
  })
}