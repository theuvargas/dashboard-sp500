import { Button } from '@tremor/react';

function AreaCardButton({ selected, target, text, setSelected }) {
    return (
        <Button
            className={selected == target ? 'text-black' : ''}
            variant="light"
            size="xs"
            onClick={() => setSelected(target)}
        >
            {text}
        </Button>
    );
}

export default AreaCardButton;
