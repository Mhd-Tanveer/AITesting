import os
import re
from pathlib import Path
from fpdf import FPDF

# File paths
project_dir = r"c:\Users\ERBLAP005\Documents\Tanveer\Projects\AITestingBlueprint3x\Project1_TC_Gen"
output_dir = project_dir
input_files = [
    ("TEST_PLAN.md", "TEST_PLAN.pdf"),
    ("Restful_Booker_API_Test_Cases.md", "Restful_Booker_API_Test_Cases.pdf"),
    ("JIRA_FORMAT_AND_EXECUTION_GUIDE.md", "JIRA_FORMAT_AND_EXECUTION_GUIDE.pdf"),
    ("QUICK_REFERENCE_GUIDE.md", "QUICK_REFERENCE_GUIDE.pdf"),
    ("README.md", "README.pdf"),
]

class PDFGenerator(FPDF):
    def __init__(self):
        super().__init__(format='A4')
        self.set_margins(10, 10, 10)
        self.set_auto_page_break(auto=True, margin=10)
        
    def header(self):
        if self.page_no() > 1:
            self.set_font("Helvetica", "", 8)
            self.set_text_color(128, 128, 128)
            self.cell(0, 5, f"Page {self.page_no()}", 0, 1, "R")
    
    def footer(self):
        self.set_y(-10)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 5, "Generated: May 30, 2026", 0, 0, "L")
    
    def add_markdown_text(self, text):
        """Convert markdown text to PDF"""
        self.set_font("Helvetica", "", 10)
        self.set_text_color(0, 0, 0)
        
        lines = text.split('\n')
        in_code_block = False
        
        for line in lines:
            # Skip empty lines occasionally
            if not line.strip():
                if self.get_y() > 5:
                    self.ln(2)
                continue
            
            # Remove unicode/emoji characters
            clean_line = ''.join(c for c in line if ord(c) < 128 or c in '\n\t ')
            
            # Code block marker
            if clean_line.strip().startswith('```'):
                in_code_block = not in_code_block
                continue
            
            if in_code_block:
                self.set_font("Courier", "", 9)
                self.set_text_color(64, 64, 64)
                try:
                    self.multi_cell(0, 4, clean_line[:80], 0, 'L')
                except:
                    pass
                self.set_font("Helvetica", "", 10)
                self.set_text_color(0, 0, 0)
                continue
            
            # Headings
            if clean_line.startswith('# '):
                self.ln(2)
                self.set_font("Helvetica", "B", 16)
                self.set_text_color(0, 51, 102)
                try:
                    self.multi_cell(0, 8, clean_line[2:].strip())
                except:
                    pass
                self.set_text_color(0, 0, 0)
                self.set_font("Helvetica", "", 10)
                self.ln(1)
                
            elif clean_line.startswith('## '):
                self.ln(1)
                self.set_font("Helvetica", "B", 12)
                self.set_text_color(0, 102, 204)
                try:
                    self.multi_cell(0, 7, clean_line[3:].strip())
                except:
                    pass
                self.set_text_color(0, 0, 0)
                self.set_font("Helvetica", "", 10)
                
            elif clean_line.startswith('### '):
                self.ln(1)
                self.set_font("Helvetica", "B", 11)
                self.set_text_color(51, 102, 153)
                try:
                    self.multi_cell(0, 6, clean_line[4:].strip())
                except:
                    pass
                self.set_text_color(0, 0, 0)
                self.set_font("Helvetica", "", 10)
                
            elif clean_line.startswith('#### '):
                self.set_font("Helvetica", "B", 10)
                self.set_text_color(102, 102, 102)
                try:
                    self.multi_cell(0, 5, clean_line[5:].strip())
                except:
                    pass
                self.set_text_color(0, 0, 0)
                self.set_font("Helvetica", "", 10)
                
            # Bullet points
            elif clean_line.strip().startswith('- '):
                self.set_font("Helvetica", "", 10)
                try:
                    self.multi_cell(0, 5, "  - " + clean_line.strip()[2:], 0, 'L')
                except:
                    pass
                
            # Numbered lists
            elif re.match(r'^\d+\.\s', clean_line.strip()):
                self.set_font("Helvetica", "", 10)
                try:
                    self.multi_cell(0, 5, clean_line.strip(), 0, 'L')
                except:
                    pass
                
            else:
                # Regular text
                self.set_font("Helvetica", "", 10)
                if len(clean_line.strip()) > 0:
                    try:
                        self.multi_cell(0, 5, clean_line.strip(), 0, 'L')
                    except:
                        pass

def markdown_to_pdf(input_file, output_file):
    """Convert markdown file to PDF"""
    try:
        # Read markdown file
        with open(input_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Create PDF
        pdf = PDFGenerator()
        pdf.add_page()
        
        # Add content
        pdf.add_markdown_text(content)
        
        # Save PDF
        pdf.output(output_file)
        print(f"OK: {Path(output_file).name}")
        return True
    except Exception as e:
        print(f"FAIL: {Path(input_file).name} - {str(e)[:50]}")
        return False

# Convert all files
print("Converting Markdown Files to PDF...")
print("-" * 60)

success_count = 0
for input_name, output_name in input_files:
    input_path = os.path.join(project_dir, input_name)
    output_path = os.path.join(output_dir, output_name)
    
    if os.path.exists(input_path):
        if markdown_to_pdf(input_path, output_path):
            success_count += 1

print("-" * 60)
print(f"Success: {success_count}/{len(input_files)} PDF files created")
print(f"Location: {output_dir}")
print("-" * 60)
