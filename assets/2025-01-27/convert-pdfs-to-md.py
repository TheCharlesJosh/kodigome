import pymupdf4llm, pathlib

# Do not forget to enable the virtualenv.
# When running this script, make sure that the `./md` folder exists.
# Remove the argument if you just want to process everything inside `./pdf`.

def convert_to_markdown(pathstr: str = "./pdf/"):
    root_path = pathlib.Path(pathstr)
    for pdf_file in root_path.glob("*.pdf"):
        md_text = pymupdf4llm.to_markdown(pdf_file)
        pathlib.Path(f"./md/{root_path.name}.{pdf_file.stem}.md").write_bytes(md_text.encode())
    for region in root_path.iterdir():
        if region.is_dir():
            for pdf_file in region.glob("*.pdf"):
                md_text = pymupdf4llm.to_markdown(pdf_file)
                pathlib.Path(f"./md/{region.name}.{pdf_file.stem}.md").write_bytes(md_text.encode())
            for province in region.iterdir():
                if province.is_dir():
                    for pdf_file in province.glob("*.pdf"):
                        md_text = pymupdf4llm.to_markdown(pdf_file)
                        pathlib.Path(f"./md/{region.name}.{province.name}.{pdf_file.stem}.md").write_bytes(md_text.encode())

convert_to_markdown()