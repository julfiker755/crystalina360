import React from "react";

export default function PdfPreview({
    params,
}: {
    params: { slug: string };
}) {
    const { slug } = params;
    const pdfUrl = `/pdf/${slug}.pdf`;

    return (
        <div>
            <div style={{ width: "100%", height: "100vh" }}>
                <iframe
                    src={pdfUrl}
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                />
            </div>
        </div>
    );
}