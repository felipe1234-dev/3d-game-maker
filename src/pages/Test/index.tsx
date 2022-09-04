import { GraphicsEditor, Modal } from "@local/components";

function TestPage() {
    return (
        <Modal 
            placement="center"
            height={600}
            width={800}
            header="Graphics Editor"
            body={<GraphicsEditor />}
            draggable
        />  
    );
}

export default TestPage;