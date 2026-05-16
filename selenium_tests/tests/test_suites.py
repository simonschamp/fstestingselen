import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from utils.driver import create_driver
from selenium_tests.utils.constants import TEST_USER, TEST_PASSWORD, BASE_URL
from selenium_tests.utils.api_helpers import delete_test_user



@pytest.mark.order(1)
def test_register_user():
    delete_test_user()

    driver = create_driver()
    wait = WebDriverWait(driver, 10)


    # Register

    driver.get(f"{BASE_URL}/register")

    wait.until(
        EC.visibility_of_element_located(
            (By.CSS_SELECTOR, '[data-cy="username-input"]')
        )
    ).send_keys(TEST_USER)

    driver.find_element(
        By.CSS_SELECTOR, '[data-cy="password-input"]'
    ).send_keys(TEST_PASSWORD)

    driver.find_element(
        By.XPATH, '//button[text()="Register"]'
    ).click()

    # Final assertion
    wait.until(lambda d: "/register" not in d.current_url)
    driver.quit()

@pytest.mark.order(2)
def test_login_user():
    driver = create_driver()
    wait = WebDriverWait(driver, 10)

    driver.get(f"{BASE_URL}/login")

    # Login

    wait.until(
        EC.visibility_of_element_located(
            (By.CSS_SELECTOR, '[data-cy="login-username"]')
        )
    ).send_keys(TEST_USER)

    driver.find_element(
        By.CSS_SELECTOR, '[data-cy="login-password"]'
    ).send_keys(TEST_PASSWORD)

    wait.until(
        EC.element_to_be_clickable(
            (By.CSS_SELECTOR, '[data-cy="login-button"]')
        )
    ).click()


    # Final Assertion
    wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, '[data-cy="login-button"]')))

    driver.quit()


    # Create
@pytest.mark.order(3)
def test_create_message():
    driver = create_driver()
    wait = WebDriverWait(driver, 10)

    driver.get(f"{BASE_URL}/getforminput")

    wait.until(EC.visibility_of_element_located(
        (By.CSS_SELECTOR, '[data-cy="message-title"]')
    )).send_keys("Selenium Title")

    driver.find_element(By.CSS_SELECTOR, '[data-cy="message-content"]').send_keys("Selenium Content")
    driver.find_element(By.CSS_SELECTOR, '[data-cy="submit-message"]').click()

    wait.until(EC.visibility_of_element_located(
        (By.XPATH, '//strong[text()="Selenium Title"]')
    ))

    driver.quit()

     # Update

@pytest.mark.order(4)
def test_update_message():
    driver = create_driver()
    wait = WebDriverWait(driver, 10)

    driver.get(f"{BASE_URL}/getforminput")

    wait.until(EC.visibility_of_element_located(
        (By.CSS_SELECTOR, '[data-cy="message-title"]')
    )).send_keys("Selenium Title")

    driver.find_element(By.CSS_SELECTOR, '[data-cy="message-content"]').send_keys("Selenium Content")
    driver.find_element(By.CSS_SELECTOR, '[data-cy="submit-message"]').click()

    driver.find_element(By.CSS_SELECTOR, '[data-cy="edit-message"]').click()
    title_input = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, '[data-cy="edit-title"]')))

    title_input.clear()

    title_input.send_keys("Updated Selenium Title")
    driver.find_element(By.CSS_SELECTOR, '[data-cy="save-message"]').click()

    wait.until(EC.visibility_of_element_located((By.XPATH, '//strong[text()="Updated Selenium Title"]')))

    driver.quit()


    # Delete

@pytest.mark.order(5)
def test_delete_message():
    driver = create_driver()
    wait = WebDriverWait(driver, 10)

    driver.get(f"{BASE_URL}/getforminput")

    wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, '[data-cy="message-title"]')
    )).send_keys("Selenium Title")

    driver.find_element(By.CSS_SELECTOR, '[data-cy="message-content"]').send_keys("Selenium Content")
    driver.find_element(By.CSS_SELECTOR, '[data-cy="submit-message"]').click()

    driver.find_element(By.CSS_SELECTOR, '[data-cy="delete-message"]').click()

    wait.until(EC.invisibility_of_element_located((By.XPATH, '//strong[text()="Updated Selenium Title"]')))

    driver.quit()


@pytest.mark.order(6)
def test_posts_fetch():
    driver = create_driver()
    wait = WebDriverWait(driver, 10)

    driver.get(f"{BASE_URL}/posts")

    wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, '[data-cy="posts-heading"]')))

    titles = wait.until(EC.presence_of_all_elements_located((By.TAG_NAME, "h3")))
    bodies = driver.find_elements(By.TAG_NAME, "p")

    assert len(titles) > 0
    assert len(bodies) > 0

    driver.quit()



@pytest.mark.order(7)
def test_use_effect_demo_fetch():
    driver = create_driver()
    wait = WebDriverWait(driver, 10)

    # Navigate to page where UseEffectDemo is rendered
    driver.get(f"{BASE_URL}/use-effect")

    # Component renders
    wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, '[data-cy="fetch-div"]')))

    # Default state → posts
    assert driver.find_element(By.CSS_SELECTOR, '[data-cy="show-data"]').text == "posts"

    # Data is fetched (non-empty)
    wait.until(lambda d: len(d.find_element(By.CSS_SELECTOR, '[data-cy="display-data"]').text) > 0)

    # Switch to comments
    driver.find_element(By.CSS_SELECTOR, '[data-cy="btn-comments"]').click()

    # UI updates
    wait.until(EC.text_to_be_present_in_element((By.CSS_SELECTOR, '[data-cy="show-data"]'), "comments"))

    # New data fetched
    wait.until(lambda d: len(d.find_element(By.CSS_SELECTOR, '[data-cy="display-data"]').text) > 0)

    driver.quit()



@pytest.mark.order(8)
def test_add_poem():
    driver = create_driver()
    wait = WebDriverWait(driver, 10)

    # --- Navigate to page containing AddPoem ---
    driver.get(f"{BASE_URL}/addpoem")

    # --- Fill poem content ---
    textarea = wait.until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, '[data-cy="message-textarea"]')))
    textarea.send_keys("This is a Selenium test poem")

    # --- Toggle VIP checkbox ---
    vip_checkbox = driver.find_element(By.CSS_SELECTOR, '[data-cy="input-checkbox"]')
    vip_checkbox.click()

    # --- Submit form ---
    driver.find_element(By.CSS_SELECTOR, '[data-cy="btn-addpoem"]').click()

    # --- Assert poem is rendered ---
    wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, '[data-cy="title-poem"]')))

    driver.quit()




@pytest.mark.order(9)
def test_comments_component():
    driver = create_driver()
    wait = WebDriverWait(driver, 10)

    # --- Navigate to Comments page ---
    driver.get(f"{BASE_URL}/comments")  # adjust URL if needed

    # Wait for the title to ensure the component is rendered
    wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, '[data-cy="title-comment"]')))

    # Wait until at least one comment heading is visible
    comment_heading = wait.until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, '[data-cy="heading-name"]'))
    )

    # Assert that we can find at least one email and body
    emails = driver.find_elements(By.CSS_SELECTOR, '[data-cy="message-email"]')
    bodies = driver.find_elements(By.CSS_SELECTOR, '[data-cy="message-body"]')

    assert len(emails) > 0, "No emails were rendered"
    assert len(bodies) > 0, "No comment bodies were rendered"

    # Optionally, check first comment's text
    assert comment_heading.text != "", "First comment name is empty"

    driver.quit()

