import requests
from selenium_tests.utils.constants import TEST_USER, BACKEND_URL


def delete_test_user():
    try:
        response = requests.delete(
            f"{BACKEND_URL}/user/{TEST_USER}",
            timeout=5
        )

        if response.status_code not in (200, 404):
            raise RuntimeError(
                f"Unexpected delete status {response.status_code}: {response.text}"
            )

    except requests.RequestException as e:
        raise RuntimeError(f"Backend not reachable while deleting user: {e}")


def reset_messages():
    try:
        response = requests.delete(
            f"{BACKEND_URL}/api/messages/reset",
            timeout=5
        )

        if response.status_code not in (200, 204):
            raise RuntimeError(
                f"Unexpected reset status {response.status_code}: {response.text}"
            )

    except requests.RequestException as e:
        raise RuntimeError(f"Backend not reachable while resetting messages: {e}")
