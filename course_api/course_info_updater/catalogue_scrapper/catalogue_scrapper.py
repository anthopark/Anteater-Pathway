from bs4 import BeautifulSoup
import re


class CatalogueScraper:
    def scrap_course_items(self, page_content: str) -> [dict]:
        soup = BeautifulSoup(page_content)
        courses = soup.find('div', attrs={'id': 'col-content'})

        courseInfo = []
        deptName = courses.find('h1', attrs={'class': 'page-title'}).text
        deptCode = re.findall(r'\(.*?\)', deptName)
        deptCode = deptCode[0].replace("(", "").replace(")", "")

        for row in courses.findAll('div', attrs={'class': 'courseblock'}):
            x = row.p.strong.text
            # print(x)
            splitText = x.split(".  ")
            unitText = splitText[2]
            course_details = {}
            course_details['dept'] = re.sub(r"\([^()]*\)", "", deptName)
            course_details['dept_code'] = deptCode
            temp = "".join(deptCode.split())
            num = "".join(splitText[0].split())
            course_details['num'] = num.replace(temp, '')
            course_details['title'] = splitText[1]

            if unitText.find('Workload Units') != -1:
                unitText = splitText[2].replace(
                    "Workload Units", '').replace(" ", "")

            if splitText[2].find('-') != -1:
                numUnits = unitText.split(' ')
                # print(numUnits)
                if len(numUnits) > 2:
                    min = numUnits[0]
                    max = numUnits[2]
                    isCustom = True
                    course_details['unit'] = int(float(min))
                    course_details['is_custom_unit'] = isCustom
                    course_details['custom_min_unit'] = int(float(min))
                    course_details['custom_max_unit'] = int(float(max))
                else:
                    min = numUnits[0].split('-')[0]
                    max = numUnits[0].split('-')[1]
                    # print(min)
                    # print(max)
                    isCustom = True
                    course_details['unit'] = int(float(min))
                    course_details['is_custom_unit'] = isCustom
                    course_details['custom_min_unit'] = int(float(min))
                    course_details['custom_max_unit'] = int(float(max))
            else:
                unit = unitText
                numUnit = unit.split(' ')
                min = None
                max = None
                isCustom = False
                if unit.find('Units') != -1:
                    if numUnit[0] == '':
                        course_details['unit'] = 0
                    else:
                        course_details['unit'] = int(float(numUnit[0]))
                else:
                    if numUnit[0] == '':
                        course_details['unit'] = 0
                    else:
                        course_details['unit'] = int(float(numUnit[0]))
                course_details['is_custom_unit'] = isCustom
                course_details['custom_min_unit'] = min
                course_details['custom_max_unit'] = max

            course_details['desc'] = row.div.p.text
            course_details['ge'] = None
            course_details['prereq'] = None
            course_details['coreq'] = None
            course_details['same_as'] = None
            course_details['repeatability'] = None
            course_details['restriction'] = None
            course_details['concurrent'] = None
            course_details['gr_option'] = None
            course_details['overlaps_with'] = None
            course_details['offered_terms'] = []

            try:
                nextSiblings = row.div.p.find_next_siblings("p")
            except:
                nextSiblibgs = ""

            for nextSibling in nextSiblings:
                if re.findall('\n', nextSibling.text) and 'Corequisite' in nextSibling.text:
                    coreq = nextSibling.text.partition('\n')[0]
                    course_details['coreq'] = coreq.partition(
                        ':')[2].replace('\xa0', '').replace('\n', '')
                elif 'corequisite' in nextSibling.text:
                    course_details['coreq'] = nextSibling.text.partition(
                        ':')[2].replace('\xa0', '').replace('\n', '')
                elif nextSibling.text.startswith('('):
                    roman = nextSibling.text
                    roman = roman.replace("(", "").replace(")", "")
                    if(re.search(r"^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$", roman)):
                        course_details['ge'] = roman
                elif nextSibling.text.startswith('Prerequisite'):
                    course_details['prereq'] = nextSibling.text.partition(
                        ':')[2].replace('\xa0', '').replace('\n', '')
                elif nextSibling.text.startswith('Same'):
                    course_details['same_as'] = nextSibling.text.partition(
                        'as')[2].replace('\xa0', '').replace('\n', '')
                elif nextSibling.text.startswith('Restriction'):
                    course_details['restriction'] = nextSibling.text.partition(
                        ':')[2].replace('\xa0', '').replace('\n', '')
                elif nextSibling.text.startswith('Concurrent'):
                    course_details['concurrent'] = nextSibling.text.partition(
                        'with')[2].replace('\xa0', '').replace('\n', '')
                elif nextSibling.text.startswith('Repeatability'):
                    course_details['repeatability'] = nextSibling.text.partition(
                        ':')[2].replace('\xa0', '').replace('\n', '')
                elif nextSibling.text.startswith('Grading'):
                    course_details['gr_option'] = nextSibling.text.partition(
                        ':')[2].replace('\xa0', '').replace('\n', '')
                elif nextSibling.text.startswith('Overlaps'):
                    course_details['overlaps_with'] = nextSibling.text.partition(
                        'with')[2].replace('\xa0', '').replace('\n', '')
            courseInfo.append(course_details)
        return courseInfo
