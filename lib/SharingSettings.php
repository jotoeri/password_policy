<?php
declare(strict_types=1);
/**
 * @copyright 2017, Roeland Jago Douma <roeland@famdouma.nl>
 *
 * @author Roeland Jago Douma <roeland@famdouma.nl>
 * @author Jonas Rittershofer <jotoeri@users.noreply.github.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Password_Policy;

use OCP\AppFramework\Http\TemplateResponse;
use OCP\Settings\ISettings;

class SharingSettings implements ISettings {

	/** @var PasswordPolicyConfig */
	private $config;

	public function __construct(PasswordPolicyConfig $config) {
		$this->config = $config;
	}

	public function getForm(): TemplateResponse {
		$response = new TemplateResponse('password_policy', 'settings-sharing-admin');
		$response->setParams([
			'sharingMinLength' => $this->config->getSharingMinLength(),
			'sharingEnforceNonCommonPassword' => $this->config->getSharingEnforceNonCommonPassword(),
			'sharingEnforceUpperLowerCase' => $this->config->getSharingEnforceUpperLowerCase(),
			'sharingEnforceNumericCharacters' => $this->config->getSharingEnforceNumericCharacters(),
			'sharingEnforceSpecialCharacters' => $this->config->getSharingEnforceSpecialCharacters(),
		]);

		return $response;
	}

	public function getSection(): string {
		return 'sharing';
	}

	public function getPriority(): int {
		return 20;
	}
}
