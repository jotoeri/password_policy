/**
 * @copyright Copyright (c) 2016 Bjoern Schiessle <bjoern@schiessle.org>
 * 
 * @author Bjoern Schiessle <bjoern@schiessle.org>
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

var sharingPasswordPolicy = {

	saveNumberValue: function(name, value) {
		OC.msg.startSaving('#password-policy-settings-msg');

		if (/^\d+$/.test(value)) {
			OCP.AppConfig.setValue('password_policy', name, value);
			OC.msg.finishedSaving('#password-policy-settings-msg',
				{
					'status': 'success',
					'data': {
						'message': OC.L10N.translate('password_policy', 'Saved')
					}
				}
			);
		} else {
			var message = OC.L10N.translate('password_policy', 'Unknown error');
			switch (name) {
				case "minLength":
					message = OC.L10N.translate('password_policy', 'Minimal length has to be a non negative number');
					break;
			}
			OC.msg.finishedSaving('#password-policy-settings-msg',
				{
					'status': 'failure',
					'data': {
						'message': message
					}
				}
			);
		}
	}

};

$(document).ready(function(){
	$('#password-policy-sharing-enforce-upper-lower-case').click(function() {
		var value = '0';
		if (this.checked) {
			value = '1';
		}
		OCP.AppConfig.setValue('password_policy', 'sharingEnforceUpperLowerCase', value);
	});
	$('#password-policy-sharing-enforce-numeric-characters').click(function() {
		var value = '0';
		if (this.checked) {
			value = '1';
		}
		OCP.AppConfig.setValue('password_policy', 'sharingEnforceNumericCharacters', value);
	});
	$('#password-policy-sharing-enforce-special-characters').click(function() {
		var value = '0';
		if (this.checked) {
			value = '1';
		}
		OCP.AppConfig.setValue('password_policy', 'sharingEnforceSpecialCharacters', value);
	});

	// register save handler for number input fields
	[
		{
			elem: '#password-policy-sharing-min-length',
			conf: 'sharingMinLength',
		},
	].forEach(function (configField) {
		console.log(configField);
		$(configField.elem).keyup(function (e) {
			if (e.keyCode === 13) {
				sharingPasswordPolicy.saveNumberValue(configField.conf, $(this).val());
			}
		}).focusout(function () {
			sharingPasswordPolicy.saveNumberValue(configField.conf, $(this).val());
		});
	})

});
