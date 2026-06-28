import { useDropzone } from "react-dropzone";

function ResumeUpload() {

    const { getRootProps, getInputProps } = useDropzone();

    return (

        <div
            {...getRootProps()}
            className="border-2 border-dashed p-8 rounded-lg"
        >

            <input {...getInputProps()} />

            <p>Drag your resume here</p>

        </div>

    );

}

export default ResumeUpload;
