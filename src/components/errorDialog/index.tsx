function ErrorDialog(props: { isActive: boolean, errorText: string }) {
    return (<div>Error { props.errorText }</div>)
}

export default ErrorDialog