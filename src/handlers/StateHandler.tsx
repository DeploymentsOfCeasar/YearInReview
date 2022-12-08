import { ReactElement, memo } from 'react';
import { Error, Loader } from '../components';

interface StateProps {
    showLoader?: boolean;
    showError?: boolean;
    msg: string | undefined;
    showEmpty?: boolean;
    retryHandler?: () => void;
    children: ReactElement<any, any> | null;
}

const StateHandler = (props: StateProps) => {
    const {
        showLoader = false,
        showError = false,
        msg,
        showEmpty = false,
        retryHandler = () => console.log('Retry!!!'),
    } = props;

    if (showLoader) {
        return <Loader />;
    }
    if (showError) {
        retryHandler();
        return <Error errorMsg={msg} />;
    }
    if (showEmpty) {
    }
    return props.children;
};

export default memo(StateHandler);
