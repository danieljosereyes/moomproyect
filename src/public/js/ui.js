export const onHandleSubmit = (e) => {
    e.preventDefault()
    console.log(
        formularioChat['email'].value,
        formularioChat['tipo'].value,
        formularioChat['mensaje'].value
    )
}