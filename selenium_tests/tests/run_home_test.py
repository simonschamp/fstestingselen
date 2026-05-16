from selenium_tests.utils.driver import create_driver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_homepage_loads():
    driver = create_driver()
    driver.get("http://localhost:5173")

    title = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, '[data-cy="app-title"]'))
    )

    assert title.text == "Welcome to Poems"

    driver.quit()
