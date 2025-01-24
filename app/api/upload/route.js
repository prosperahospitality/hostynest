import { NextResponse } from "next/server";
import cloudinary from "@/_lib/util/cloudinary";

export async function GET(req) {
    try {
        const folder = req.nextUrl.searchParams.get('folder');
        const subfolder = req.nextUrl.searchParams.get('subfolder');

        // Fetch images from Cloudinary
        const result = await cloudinary.api.resources({
            type: 'upload',
            prefix: `${folder}/${subfolder}`,
            max_results: 500,
        });

        const imageUrls = result.resources.map(resource => resource.secure_url);

        return NextResponse.json({ success: true, results: imageUrls }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    if (req.headers.get("content-type")?.includes("application/json")) {
        const payload = await req.json();

        if (payload.action === "delete") {
            try {
                if (!payload.publicIds || !Array.isArray(payload.publicIds)) {
                    return NextResponse.json({ success: false, error: 'Invalid public IDs' }, { status: 400 });
                }

                const deletePromises = payload.publicIds.map(publicId =>
                    cloudinary.api.delete_resources(`${payload.folder}/${payload.subfolder}/${publicId}`, (error, result) => {
                        if (error) {
                            console.error(`Failed to delete ${publicId} from folder ${payload.folder}:`, error);
                        } else {
                            console.log(`Successfully deleted ${publicId} from folder ${payload.folder}:`, result);
                        }
                    })
                );

                await Promise.all(deletePromises);

                return NextResponse.json({ success: true }, { status: 200 });
            } catch (error) {
                console.log("Error::::::>", error);
                return NextResponse.json({ success: false, error: error.message }, { status: 500 });
            }
        }
    } else if (req.headers.get("content-type")?.includes("multipart/form-data")) {
        try {
            const formData = await req.formData();
            const files = formData.getAll("files");
            const folder = formData.get("folder");
            const subfolder = formData.get("subfolder");

            const uploadPromises = files.map(async (file, index) => {
                const buffer = await file.arrayBuffer();
                const base64Data = Buffer.from(buffer).toString('base64');
                const dataUri = `data:${file.type};base64,${base64Data}`;

                return cloudinary.uploader.upload(dataUri, {
                    folder: `${folder}/${subfolder}`,
                });
            });

            const results = await Promise.all(uploadPromises);

            return NextResponse.json({ success: true, results }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }
    }

    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
}
